// models/DonationRequest.js
import mongoose from 'mongoose';

const donationRequestSchema = new mongoose.Schema({
  type: { type: String, enum: ['blood', 'organ'], required: true },
  userId: { type: String, required: true }, // Clerk user.id (not email or name)
  details: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  adminRemarks: { type: String },
  confirmedByUser: { type: Boolean, default: false }
}, { timestamps: true });

const DonationRequest = mongoose.model('DonationRequest', donationRequestSchema);

export default DonationRequest;
