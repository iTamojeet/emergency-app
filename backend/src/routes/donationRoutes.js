import express from 'express';
import {
  createDonations,
  getAllDonations,
  updateDonationStatus,
  confirmDonationResponse
} from '../controller/donationController.js';

const router = express.Router();

router.post('/', createDonations); // User creates request
router.get('/', getAllDonations); // Admin gets all requests
router.put('/:id/status', updateDonationStatus); // Admin updates status
router.put('/:id/confirm', confirmDonationResponse); // User confirms result

export default router;
