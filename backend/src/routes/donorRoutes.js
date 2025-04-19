import express from 'express';
import { check } from 'express-validator';
import { 
  createDonorProfile,
  getDonors,
  getDonorById,
  updateDonorProfile,
  updateAvailability,
  getDonationHistory,
  addDonationRecord
} from '../controller/donorController.js';

const router = express.Router();

// @route   POST api/donors
// @desc    Create donor profile
// @access  Public
router.post(
  '/',
  [
    check('bloodType', 'Blood type is required').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    check('organDonatable', 'Organ donation preferences are required').isArray(),
    check('physicalDetails', 'Physical details are required').not().isEmpty()
  ],
  createDonorProfile
);

// @route   GET api/donors
// @desc    Get all donors with filtering
// @access  Public
router.get(
  '/',
  getDonors
);

// @route   GET api/donors/:id
// @desc    Get donor by ID
// @access  Public
router.get(
  '/:id',
  getDonorById
);

// @route   PUT api/donors/:id
// @desc    Update donor profile
// @access  Public
router.put(
  '/:id',
  updateDonorProfile
);

// @route   PATCH api/donors/:id/availability
// @desc    Update donor availability
// @access  Public
router.patch(
  '/:id/availability',
  updateAvailability
);

// @route   GET api/donors/:id/history
// @desc    Get donor donation history
// @access  Public
router.get(
  '/:id/history',
  getDonationHistory
);

// @route   POST api/donors/:id/donation
// @desc    Add donation record
// @access  Public
router.post(
  '/:id/donation',
  [
    check('donationType', 'Donation type is required').isIn(['blood', 'plasma', 'platelets', 'organ']),
    check('date', 'Date is required').isISO8601()
  ],
  addDonationRecord
);

export default router;