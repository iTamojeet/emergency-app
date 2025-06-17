import PoliceStation from "../models/PoliceStation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const createPoliceStation = async (req, res) => {
  try {
    const { name, address, phone, email, username, password } = req.body;

    if (!name || !address || !phone || !email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    const existingUsername = await PoliceStation.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken!' });
    }
  
    const existingEmail = await PoliceStation.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered!' });
    }
  
    const hashed = await bcrypt.hash(password, 10);
    const policeStation = await PoliceStation.create({ 
      name, 
      address, 
      phone, 
      email, 
      username, 
      password: hashed 
    });

    res.status(201).json({ message: 'Police registered successfully!', policeStation });
  } catch (error) {
    res.status(500).json({ message: 'Server Error!', error: error.toString() });
  }
};

export const policeLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required!" });
    }
  
    const police = await PoliceStation.findOne({ username });
    if (!police) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
  
    const match = await bcrypt.compare(password, police.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
  
    const token = jwt.sign({ id: police._id, role:'police' }, process.env.POLICE_SECRET_KEY, { expiresIn:'1h' });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.toString() });
  } 
};

