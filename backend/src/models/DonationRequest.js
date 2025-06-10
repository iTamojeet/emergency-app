import mongoose from 'mongoose';

const donationRequestSchema = new mongoose.Schema({
  type: { type: String, enum: ['blood', 'organ'], required: true },
  user: { type: String, required: true }, // can be user ID, name, or email
  details: { type: String }, // e.g. blood group or organ type
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  adminRemarks: { type: String },
  confirmedByUser: { type: Boolean, default: false }
}, { timestamps: true });

const DonationRequest = mongoose.model('DonationRequest', donationRequestSchema);

export default DonationRequest;
