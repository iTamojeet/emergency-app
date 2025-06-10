import DonationRequest from '../models/DonationRequest.js';

// Create new donation request
export const createDonations = async (req, res) => {
  try {
    const donation = await DonationRequest.create(req.body);
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all donation requests
export const getAllDonations = async (req, res) => {
  const donations = await DonationRequest.find().sort({ createdAt: -1 });
  res.json(donations);
};

// Admin action (accept/reject)
export const updateDonationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminRemarks } = req.body;

  try {
    const donation = await DonationRequest.findByIdAndUpdate(id, { status, adminRemarks }, { new: true });
    res.json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User confirmation
export const confirmDonationResponse = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await DonationRequest.findByIdAndUpdate(id, { confirmedByUser: true }, { new: true });
    res.json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
