import express from 'express';
import { check } from 'express-validator';

import { 
  createHospitalProfile,
  getHospitals,
  getHospitalById,
  updateHospitalProfile,
  updateCapacity,
  findNearbyHospitals
} from '../controller/hospitalController.js';
// import { authenticate } from '../middleware/auth.js';
import { checkRole, ROLES } from '../middleware/roles.js';

const router = express.Router();

// @route   POST api/hospitals
// @desc    Create hospital profile
// @access  Private
router.post(
  '/',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN]),
    [
      check('name', 'Hospital name is required').not().isEmpty(),
      check('licenseNumber', 'License number is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('contactInfo', 'Contact information is required').not().isEmpty()
    ]
  ],
  createHospitalProfile
);

// @route   GET api/hospitals
// @desc    Get all hospitals
// @access  Private
router.get('/', getHospitals);

// @route   GET api/hospitals/:id
// @desc    Get hospital by ID
// @access  Private
router.get('/:id', getHospitalById);

// @route   PUT api/hospitals/:id
// @desc    Update hospital profile
// @access  Private
router.put(
  '/:id',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN])
  ],
  updateHospitalProfile
);

// @route   PATCH api/hospitals/:id/capacity
// @desc    Update hospital capacity
// @access  Private
router.patch(
  '/:id/capacity',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN])
  ],
  updateCapacity
);

// @route   GET api/hospitals/nearby
// @desc    Find nearby hospitals
// @access  Private
router.get(
  '/search/nearby',
  [
    // authenticate,
    check('lng', 'Longitude is required').isNumeric(),
    check('lat', 'Latitude is required').isNumeric(),
    check('maxDistance', 'Max distance must be a positive number')
      .optional()
      .isNumeric()
      .toFloat()
      .custom(value => value > 0)
  ],
  findNearbyHospitals
);

export default router;
