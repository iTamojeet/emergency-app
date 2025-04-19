import express from 'express';
import { check } from 'express-validator';

import { 
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  updateRequest,
  deleteRequest
} from '../controller/requestController.js';
// import { authenticate } from '../middleware/auth.js';
import { checkRole, ROLES } from '../middleware/roles.js';

const router = express.Router();

// @route   POST api/requests
// @desc    Create donation request
// @access  Public
router.post(
  '/',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN, ROLES.COORDINATOR]),
    [
      check('requestType', 'Request type is required').isIn(['blood', 'organ']),
      check('recipientDetails', 'Recipient details are required').not().isEmpty(),
      check('requiredBy', 'Required by date is required').isISO8601()
    ]
  ],
  createRequest
);

// @route   GET api/requests
// @desc    Get all requests with filtering
// @access  Public
router.get('/', getRequests);

// @route   GET api/requests/:id
// @desc    Get request by ID
// @access  Public
router.get('/:id', getRequestById);

// @route   PATCH api/requests/:id/status
// @desc    Update request status
// @access  Public
router.patch(
  '/:id/status',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN, ROLES.COORDINATOR]),
    check('status', 'Status is required').isIn([
      'pending',
      'searching',
      'matched',
      'in_progress',
      'completed',
      'cancelled'
    ])
  ],
  updateRequestStatus
);

// @route   PUT api/requests/:id
// @desc    Update request
// @access  Public
router.put(
  '/:id',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN, ROLES.COORDINATOR])
  ],
  updateRequest
);

// @route   GET api/requests/urgent/:type
// @desc    Get urgent requests by type (blood/organ)
// @access  Public
router.get(
  '/urgent/:type',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN, ROLES.COORDINATOR, ROLES.DONOR])
  ],
  getRequests
);

export default router;
