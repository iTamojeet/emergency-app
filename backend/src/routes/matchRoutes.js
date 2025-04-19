import express from 'express';
import { check } from 'express-validator';

import { 
  getMatches,
  getMatchById,
  findPotentialMatches,
  confirmMatch
} from '../controller/matchController.js';
// import { authenticate } from '../middleware/auth.js';
import { checkRole, ROLES } from '../middleware/roles.js';

const router = express.Router();

// @route   GET api/matches
// @desc    Get all matches with filtering
// @access  Public
router.get('/', getMatches);

// @route   GET api/matches/index
// @desc    Index route for matches API
// @access  Public
router.get('/index', (req, res) => {
  res.json({
    message: 'Welcome to the Matches API',
    endpoints: [
      { method: 'GET', path: '/api/matches', description: 'Get all matches with filtering' },
      { method: 'GET', path: '/api/matches/:id', description: 'Get match by ID' },
      { method: 'POST', path: '/api/matches/search', description: 'Find potential matches for a request' },
      { method: 'POST', path: '/api/matches/:requestId/confirm/:donorId', description: 'Confirm a match' }
    ]
  });
});

// @route   POST api/matches/search
// @desc    Find potential matches for a request
// @access  Public
router.post(
  '/search',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN, ROLES.COORDINATOR]),
    check('requestId', 'Request ID is required').isMongoId()
  ],
  findPotentialMatches
);

// @route   POST api/matches/:requestId/confirm/:donorId
// @desc    Confirm a match
// @access  Public
router.post(
  '/:requestId/confirm/:donorId',
  [
    // authenticate,
    // checkRole([ROLES.HOSPITAL, ROLES.ADMIN, ROLES.COORDINATOR])
  ],
  confirmMatch
);

// @route   GET api/matches/:id
// @desc    Get match by ID
// @access  Public
router.get('/:id', getMatchById);

export default router;
