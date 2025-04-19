// controllers/matchController.js
import Match from '../models/Match.js';
import Request from '../models/Request.js';
import Donor from '../models/Donor.js';
import Hospital from '../models/Hospital.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import mailer from '../utils/mailer.js';

/**
 * @desc    Get all matches with filtering
 * @route   GET /api/matches
 */
export const getMatches = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    
    // Build filter object
    let filter = {};
    
    // Filter by status if provided
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Filter by request type if provided
    if (req.query.requestType) {
      filter.requestType = req.query.requestType;
    }
    
    // If user is hospital, only show matches related to their requests
    if (req.user.role === 'hospital') {
      const hospital = await Hospital.findOne({ user: req.user.id });
      if (!hospital) {
        return res.status(404).json({ msg: 'Hospital profile not found' });
      }
      
      // Find requests from this hospital
      const hospitalRequests = await Request.find({ hospital: hospital._id });
      const requestIds = hospitalRequests.map(req => req._id);
      
      // Filter matches by these request IDs
      filter.request = { $in: requestIds };
    }
    
    // If user is donor, only show their matches
    if (req.user.role === 'donor') {
      const donor = await Donor.findOne({ user: req.user.id });
      if (!donor) {
        return res.status(404).json({ msg: 'Donor profile not found' });
      }
      filter.donor = donor._id;
    }

    // Execute query with pagination
    const matches = await Match.find(filter)
      .populate('request', 'requestType requiredBy status')
      .populate('donor', 'name bloodType')
      .populate({
        path: 'request',
        populate: { path: 'hospital', select: 'name location' }
      })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Match.countDocuments(filter);

    // Pagination result
    const pagination = {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    };

    res.json({ matches, pagination });
  } catch (err) {
    console.error('Get matches error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc    Get match by ID
 * @route   GET /api/matches/:id
 */
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('request')
      .populate('donor')
      .populate({
        path: 'request',
        populate: { path: 'hospital', select: 'name location contactInfo' }
      });

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    // Check if user has permission to view this match
    if (req.user.role === 'hospital') {
      const hospital = await Hospital.findOne({ user: req.user.id });
      if (!hospital) {
        return res.status(404).json({ msg: 'Hospital profile not found' });
      }
      
      // Check if this match is related to a request from this hospital
      const request = await Request.findById(match.request);
      if (!request || request.hospital.toString() !== hospital._id.toString()) {
        return res.status(403).json({ msg: 'Not authorized to view this match' });
      }
    } else if (req.user.role === 'donor') {
      const donor = await Donor.findOne({ user: req.user.id });
      if (!donor) {
        return res.status(404).json({ msg: 'Donor profile not found' });
      }
      
      // Check if this match involves this donor
      if (match.donor.toString() !== donor._id.toString()) {
        return res.status(403).json({ msg: 'Not authorized to view this match' });
      }
    }

    res.json(match);
  } catch (err) {
    console.error('Get match by ID error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc    Find potential matches for a request
 * @route   POST /api/matches/search
 */
export const findPotentialMatches = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const request = await Request.findById(req.body.requestId);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    // Check permission if hospital user
    if (req.user.role === 'hospital') {
      const hospital = await Hospital.findOne({ user: req.user.id });
      if (!hospital || hospital._id.toString() !== request.hospital.toString()) {
        return res.status(403).json({ msg: 'Not authorized to search matches for this request' });
      }
    }

    // Build match criteria based on request type
    let matchCriteria = {};
    
    if (request.requestType === 'blood') {
      // Match based on blood type compatibility
      const compatibleTypes = getCompatibleBloodTypes(request.bloodType);
      matchCriteria = {
        'donorProfile.bloodType': { $in: compatibleTypes },
        'donorProfile.availableForBloodDonation': true,
        'donorProfile.lastBloodDonationDate': { 
          $lt: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000) // 56 days (8 weeks) since last donation
        }
      };
    } else if (request.requestType === 'organ') {
      // Match based on organ type and other criteria
      matchCriteria = {
        'donorProfile.organDonor': true,
        'donorProfile.organsForDonation': request.organType, 
        'donorProfile.bloodType': { $in: getCompatibleBloodTypes(request.bloodType) }
      };
      
      // Additional tissue matching criteria can be added here
    }

    // Find active donors matching the criteria
    const donors = await User.find({
      role: 'donor',
      status: 'active',
      ...matchCriteria
    }).populate('donorProfile');

    // Return potential matches
    res.json(donors.map(donor => ({
      donorId: donor._id,
      name: donor.name,
      bloodType: donor.donorProfile.bloodType,
      location: donor.donorProfile.location,
      matchScore: calculateMatchScore(request, donor.donorProfile) // Optional score calculation
    })));
  } catch (err) {
    console.error('Find potential matches error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc    Confirm a match
 * @route   POST /api/matches/:requestId/confirm/:donorId
 */
export const confirmMatch = async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    const donor = await Donor.findById(req.params.donorId);
    if (!donor) {
      return res.status(404).json({ msg: 'Donor not found' });
    }

    // Check permission if hospital user
    if (req.user.role === 'hospital') {
      const hospital = await Hospital.findOne({ user: req.user.id });
      if (!hospital || hospital._id.toString() !== request.hospital.toString()) {
        return res.status(403).json({ msg: 'Not authorized to confirm matches for this request' });
      }
    }

    // Check if a match already exists
    const existingMatch = await Match.findOne({
      request: request._id,
      donor: donor._id
    });

    if (existingMatch) {
      return res.status(400).json({ msg: 'Match already exists for this donor and request' });
    }

    // Create the match
    const match = new Match({
      request: request._id,
      donor: donor._id,
      status: 'proposed',
      proposedBy: req.user.id,
      matchType: request.requestType,
      urgencyLevel: request.recipientDetails.urgencyLevel
    });

    await match.save();

    // Update request status
    request.status = 'matched';
    request.matches = [...(request.matches || []), match._id];
    await request.save();

    // Send notification to donor
    try {
      await mailer.sendMatchNotificationEmail(donor, request);
    } catch (err) {
      console.error('Error sending notification:', err);
    }

    res.status(200).json({ msg: 'Match confirmed' });
  } catch (err) {
    console.error('Confirm match error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
