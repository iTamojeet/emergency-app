import mongoose from 'mongoose';
import { isValidObjectId } from '../utils/validation';

/*
 * Validates a message object's structure and content
 * @param {Object} message - The message to validate
 * @param {Object} schema - Schema definition for validation
 * @returns {Object} - Validation result with errors if any
 */
export const validateMessage = (message, schema) => {
  const errors = [];
  
  // Check if required fields exist
  for (const field of schema.required || []) {
    if (message[field] === undefined) {
      errors.push(`${field} is required`);
    }
  }
  
  // Validate field types and values
  for (const [field, rules] of Object.entries(schema.fields || {})) {
    if (message[field] !== undefined) {
      // Type validation
      if (rules.type && typeof message[field] !== rules.type) {
        errors.push(`${field} must be a ${rules.type}`);
      }
      
      // ObjectId validation
      if (rules.isObjectId && !isValidObjectId(message[field])) {
        errors.push(`${field} must be a valid ID`);
      }
      
      // Enum validation
      if (rules.enum && !rules.enum.includes(message[field])) {
        errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
      }
      
      // Min/max for numbers
      if (typeof message[field] === 'number') {
        if (rules.min !== undefined && message[field] < rules.min) {
          errors.push(`${field} must be at least ${rules.min}`);
        }
        if (rules.max !== undefined && message[field] > rules.max) {
          errors.push(`${field} must be at most ${rules.max}`);
        }
      }
      
      // Min/max length for strings
      if (typeof message[field] === 'string') {
        if (rules.minLength !== undefined && message[field].length < rules.minLength) {
          errors.push(`${field} must be at least ${rules.minLength} characters`);
        }
        if (rules.maxLength !== undefined && message[field].length > rules.maxLength) {
          errors.push(`${field} must be at most ${rules.maxLength} characters`);
        }
      }
      
      // Array validation
      if (Array.isArray(message[field]) && rules.arrayOf) {
        for (let i = 0; i < message[field].length; i++) {
          const itemErrors = validateMessage(message[field][i], rules.arrayOf);
          if (itemErrors.errors.length > 0) {
            errors.push(`${field}[${i}]: ${itemErrors.errors.join(', ')}`);
          }
        }
      }
      
      // Object validation (nested schema)
      if (rules.schema && typeof message[field] === 'object' && !Array.isArray(message[field])) {
        const nestedErrors = validateMessage(message[field], rules.schema);
        if (nestedErrors.errors.length > 0) {
          errors.push(`${field}: ${nestedErrors.errors.join(', ')}`);
        }
      }
      
      // Custom validation function
      if (rules.validate && typeof rules.validate === 'function') {
        const customError = rules.validate(message[field], message);
        if (customError) {
          errors.push(customError);
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Message schemas for different socket events
export const messageSchemas = {
  // Connection and authentication
  'authenticate': {
    required: ['token'],
    fields: {
      token: { type: 'string', minLength: 10 }
    }
  },
  
  // Request management
  'new-request': {
    required: ['hospitalId', 'requestType', 'recipientDetails', 'requiredBy'],
    fields: {
      hospitalId: { type: 'string', isObjectId: true },
      requestType: { type: 'string', enum: ['blood', 'organ'] },
      bloodType: { 
        type: 'string', 
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      },
      bloodQuantity: { type: 'number', min: 1 },
      bloodComponent: { 
        type: 'string', 
        enum: ['whole', 'plasma', 'platelets', 'red_cells'] 
      },
      organType: { 
        type: 'string', 
        enum: ['kidney', 'liver', 'heart', 'lung', 'pancreas', 'intestine', 'cornea', 'bone', 'skin', 'heart_valve'] 
      },
      recipientDetails: {
        type: 'object',
        schema: {
          required: ['urgencyLevel'],
          fields: {
            age: { type: 'number', min: 0, max: 120 },
            gender: { type: 'string' },
            bloodType: { 
              type: 'string', 
              enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
            },
            urgencyLevel: { 
              type: 'string', 
              enum: ['routine', 'urgent', 'emergency', 'critical'] 
            }
          }
        }
      },
      requiredBy: { 
        type: 'string', 
        validate: (value) => {
          const date = new Date(value);
          if (isNaN(date.getTime())) return 'Must be a valid date';
          if (date <= new Date()) return 'Must be a future date';
          return null;
        }
      },
      notes: { type: 'string', maxLength: 1000 },
      matchCriteria: {
        type: 'object',
        schema: {
          fields: {
            maxDistanceKm: { type: 'number', min: 1, max: 1000 },
            preferredAgeRange: {
              type: 'object',
              schema: {
                fields: {
                  min: { type: 'number', min: 16, max: 100 },
                  max: { type: 'number', min: 16, max: 100 }
                }
              }
            },
            additionalRequirements: { type: 'object' }
          }
        }
      }
    }
  },
  
  // Other schemas...
};

/*
 * Socket.io middleware for validating messages
 * @param {Object} socket - Socket.io socket object
 * @param {Function} next - Next function to call
 */
export const validateSocketMessages = (socket) => {
  // Add validation middleware to each event
  const origOn = socket.on;
  
  // Override the 'on' method to add validation
  socket.on = function(event, callback) {
    if (messageSchemas[event]) {
      return origOn.call(this, event, (message, ack) => {
        const validation = validateMessage(message, messageSchemas[event]);
        
        if (!validation.isValid) {
          // If ack is a function, call it with validation errors
          if (typeof ack === 'function') {
            return ack({
              success: false,
              errors: validation.errors
            });
          }
          
          // Emit validation error event
          return socket.emit('validation_error', {
            event,
            errors: validation.errors
          });
        }
        
        // Validation passed, call the original callback
        return callback(message, ack);
      });
    }
    
    // For events without schemas, just pass through
    return origOn.call(this, event, callback);
  };
};
