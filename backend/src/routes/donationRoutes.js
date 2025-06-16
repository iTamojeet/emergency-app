import express from 'express';
import {
  createDonations,
  getAllDonations,
  updateDonationStatus,
  confirmDonationResponse,
  getUserDonations
} from '../controller/donationController.js';

const router = express.Router();

router.post('/', createDonations); // Clerk user creates donation
router.get('/', getAllDonations); // Admin fetches all
router.get('/mine', getUserDonations); // Logged-in user's own requests
router.put('/:id/status', updateDonationStatus); // Admin status update
router.put('/:id/confirm', confirmDonationResponse); // User confirms

export default router;
