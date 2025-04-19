import Police_FIR from "../models/FIRapplication.js";

export const createEmergencyReport = async (req, res) => {
  try {
    const { name, location, emergencyType, description } = req.body;

    // Validate required fields
    if (!name || !location || !emergencyType) {
      return res.status(400).json({ message: 'Name, location, and emergency type are required.' });
    }

    // Create new emergency report
    const newReport = new Police_FIR({
      name,
      location,
      emergencyType,
      description,
    });

    // Save to DB
    const savedReport = await newReport.save();
    res.status(201).json({ message: 'Emergency report created successfully', data: savedReport });

  } catch (error) {
    console.error('Error creating emergency report:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


