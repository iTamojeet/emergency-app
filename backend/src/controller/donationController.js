import DonationRequest from '../models/DonationRequest.js';

// Create new donation request (Clerk user ID from req.auth.userId)
export const createDonations = async (req, res) => {
  try {
    const userId = req.body.userId; // ← accept from frontend instead of Clerk

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized. No user ID provided.' });
    }

    const donation = await DonationRequest.create({
      ...req.body,
      userId,
    });

    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all donation requests (Admin use)
export const getAllDonations = async (req, res) => {
  try {
    const donations = await DonationRequest.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get donations for logged-in user
export const getUserDonations = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized. No Clerk user ID found.' });
    }

    const donations = await DonationRequest.find({ userId }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin action (accept/reject donation)
export const updateDonationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminRemarks } = req.body;

  try {
    const donation = await DonationRequest.findByIdAndUpdate(
      id,
      { status, adminRemarks },
      { new: true }
    );
    res.json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User confirms donation response
export const confirmDonationResponse = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await DonationRequest.findByIdAndUpdate(
      id,
      { confirmedByUser: true },
      { new: true }
    );
    res.json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
