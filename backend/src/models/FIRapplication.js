import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  emergencyType: {
    type: String,
    required: true,
    enum: ['suicide', 'accident', 'other'],
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Police_FIR = mongoose.model('FIR_APPLICATION', emergencySchema);

export default Police_FIR;
