/**
 * Notifications Utility (ESM Version)
 */

import nodemailer from 'nodemailer';
import twilio from 'twilio';
import User from '../models/User.js';
import socketManager from '../websocket/socketManager.js';
import Donor from '../models/Donor.js';

// Configure email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'notifications@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password'
  }
});

// Configure SMS (Twilio)
let smsClient;
try {
  smsClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} catch (error) {
  console.warn('Twilio not configured, SMS will be simulated only.');
}

// Email notification
export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME || 'Donation System'} <${process.env.EMAIL_FROM_ADDRESS || 'notifications@example.com'}>`,
      to,
      subject,
      text,
      html: html || text
    };
    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// SMS notification
export const sendSMS = async (to, message) => {
  try {
    if (!smsClient) {
      console.log('SMS simulated to:', to, 'Message:', message);
      return { simulated: true };
    }

    const result = await smsClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });

    console.log('SMS sent:', result.sid);
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

// Push notification (placeholder)
export const sendPushNotification = async (userId, notification) => {
  try {
    console.log(`Push notification would be sent to user ${userId}:`, notification);
    return { simulated: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};

// WebSocket / In-App Notification
export const sendSocketNotification = (userId, notification) => {
  try {
    const notificationWithTimestamp = {
      ...notification,
      timestamp: new Date()
    };
    return socketManager.sendNotificationToUser(userId, notificationWithTimestamp);
  } catch (error) {
    console.error('Error sending socket notification:', error);
    return false;
  }
};

// Smart notify user
export const notifyUser = async (userId, notification) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error(`User not found: ${userId}`);

    const results = {
      inApp: false,
      email: null,
      sms: null,
      push: null
    };

    // In-app notification
    results.inApp = sendSocketNotification(userId, {
      type: notification.type,
      title: notification.subject,
      message: notification.message,
      data: notification.data
    });

    if (user.role === 'donor' && notification.checkPreferences) {
      const donor = await Donor.findOne({ user: userId });
      if (donor?.contactPreferences?.method) {
        const method = donor.contactPreferences.method;
        if (method === 'email') {
          results.email = await sendEmail(user.email, notification.subject, notification.message, notification.html);
        } else if (method === 'sms' || method === 'phone') {
          results.sms = await sendSMS(user.phone, notification.message);
        }
        return results;
      }
    }

    // Urgent or critical notifications go to all channels
    if (['urgent', 'critical'].includes(notification.type)) {
      try {
        results.email = await sendEmail(user.email, notification.subject, notification.message, notification.html);
      } catch (e) {
        console.error('Failed to send urgent email:', e);
      }

      try {
        results.sms = await sendSMS(user.phone, notification.message);
      } catch (e) {
        console.error('Failed to send urgent SMS:', e);
      }

      try {
        results.push = await sendPushNotification(userId, {
          title: notification.subject,
          body: notification.message
        });
      } catch (e) {
        console.error('Failed to send urgent push notification:', e);
      }
    } else {
      results.email = await sendEmail(user.email, notification.subject, notification.message, notification.html);
    }

    return results;
  } catch (error) {
    console.error('Error notifying user:', error);
    throw error;
  }
};

// Notify match
export const notifyAboutMatch = async (match) => {
  try {
    const populatedMatch = await match.populate([
      { path: 'request', populate: { path: 'hospital' } },
      { path: 'donor', populate: { path: 'user' } }
    ]);

    const { request, donor } = populatedMatch;
    const hospital = request.hospital;

    const hospitalNotification = {
      type: 'match',
      subject: `New ${request.requestType} donation match found!`,
      message: `A potential ${request.requestType} donor has been matched to your request. Match score: ${match.matchScore}/100.`,
      html: `<h2>New donation match found!</h2>
        <p>Details below:</p>
        <ul>
          <li><strong>Type:</strong> ${request.requestType}</li>
          ${request.requestType === 'blood' ?
            `<li><strong>Blood Type:</strong> ${request.bloodType}</li>
             <li><strong>Component:</strong> ${request.bloodComponent}</li>` :
            `<li><strong>Organ:</strong> ${request.organType}</li>`}
          <li><strong>Score:</strong> ${match.matchScore}/100</li>
          <li><strong>Distance:</strong> ${match.matchFactors.distanceKm} km</li>
          <li><strong>ETA:</strong> ${match.matchFactors.timeToTransport} minutes</li>
        </ul>
        <p><a href="${process.env.APP_URL || 'http://localhost:3000'}/matches/${match._id}">View match</a></p>`,
      data: {
        matchId: match._id.toString(),
        requestId: request._id.toString()
      }
    };

    const donorNotification = {
      type: 'match',
      subject: `You've been matched for a ${request.requestType} donation!`,
      message: `You've been matched with a donation request from ${hospital.name}.`,
      html: `<h2>Donation match found!</h2>
        <p>Details:</p>
        <ul>
          <li><strong>Type:</strong> ${request.requestType}</li>
          ${request.requestType === 'blood' ?
            `<li><strong>Blood Type Requested:</strong> ${request.bloodType}</li>
             <li><strong>Component:</strong> ${request.bloodComponent}</li>` :
            `<li><strong>Organ:</strong> ${request.organType}</li>`}
          <li><strong>Hospital:</strong> ${hospital.name}</li>
          <li><strong>Location:</strong> ${hospital.location.address.city}, ${hospital.location.address.state}</li>
          <li><strong>Distance:</strong> ${match.matchFactors.distanceKm} km</li>
        </ul>
        <p><a href="${process.env.APP_URL || 'http://localhost:3000'}/donations/matches/${match._id}">Confirm availability</a></p>`,
      data: {
        matchId: match._id.toString(),
        hospitalName: hospital.name,
        hospitalId: hospital._id.toString()
      },
      checkPreferences: true
    };

    const hospitalResults = await notifyUser(hospital.user, hospitalNotification);
    const donorResults = await notifyUser(donor.user._id, donorNotification);

    return {
      hospital: hospitalResults,
      donor: donorResults
    };
  } catch (error) {
    console.error('Error notifying about match:', error);
    throw error;
  }
};
