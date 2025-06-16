import DonationRequest from '../models/DonationRequest.js';

// ✅ Create new donation request (userId comes from body)
export const createDonations = async (req, res) => {
  try {
    const userId = req.body.userId;

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

// ✅ Admin fetch: Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await DonationRequest.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get donations for a specific user (read from query param)
export const getUserDonations = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const donations = await DonationRequest.find({ userId }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Admin: Update donation request status (accept/reject)
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

// ✅ User confirms the hospital's response
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
