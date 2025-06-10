import express from "express";
import mongoose from "mongoose"
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';
// import { createServer } from 'http';
// import socketManager from './src/websocket/socketManager.js';


//import routes

import donationRoutes from './src/routes/donationRoutes.js';
import emergencyRoutes from "./src/routes/firRoute.js"

dotenv.config();

const app = express();
//const httpServer = createServer(app);

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Routes
app.use('/api', emergencyRoutes);
app.use('/api/donations', donationRoutes);

// app.use('/api/hospitals', hospitalRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/matches', matchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Initialize socket.io
//new socketManager(httpServer);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'development' ? err : {}
//   });
// });


// Mock Database - Real Hospitals in Kolkata   (TOMO)
const hospitals = [
  {
    id: 1,
    name: "AMRI Hospital, Salt Lake",
    beds: 350,
    oxygen: true,
    lat: 22.5726,
    lng: 88.3639,
    address: "16/1, Broadway Rd, Hatiara, Kolkata, West Bengal 700157"
  },
  {
    id: 2,
    name: "Fortis Hospital, Anandapur",
    beds: 400,
    oxygen: true,
    lat: 22.5112,
    lng: 88.3947,
    address: "730, Anandapur, E.M. Bypass, Kolkata, West Bengal 700107"
  },
  {
    id: 3,
    name: "Apollo Gleneagles Hospitals",
    beds: 500,
    oxygen: true,
    lat: 22.5362,
    lng: 88.3527,
    address: "58, Canal Circular Rd, Kadapara, Phool Bagan, Kankurgachi, Kolkata, West Bengal 700054"
  },
  {
    id: 4,
    name: "Medica Superspecialty Hospital",
    beds: 400,
    oxygen: true,
    lat: 22.5362,
    lng: 88.3527,
    address: "127, Mukundapur, E.M. Bypass, Kolkata, West Bengal 700099"
  },
  {
    id: 5,
    name: "Woodlands Multispeciality Hospital",
    beds: 200,
    oxygen: true,
    lat: 22.5204,
    lng: 88.3462,
    address: "8/5, Alipore Road, Kolkata, West Bengal 700027"
  },
  {
    id: 6,
    name: "Peerless Hospital",
    beds: 300,
    oxygen: true,
    lat: 22.4569,
    lng: 88.3903,
    address: "360, Panchasayar, Garia, Kolkata, West Bengal 700094"
  },
  {
    id: 7,
    name: "Ruby General Hospital",
    beds: 250,
    oxygen: true,
    lat: 22.4997,
    lng: 88.3247,
    address: "E.M. Bypass, Kasba, Kolkata, West Bengal 700078"
  },
  {
    id: 8,
    name: "Belle Vue Clinic",
    beds: 150,
    oxygen: true,
    lat: 22.5431,
    lng: 88.3402,
    address: "9, Dr. U. N. Brahmachari Street, Kolkata, West Bengal 700017"
  },
  {
    id: 9,
    name: "Calcutta Medical Research Institute",
    beds: 200,
    oxygen: true,
    lat: 22.5362,
    lng: 88.3527,
    address: "7/2, Diamond Harbour Road, Kolkata, West Bengal 700027"
  },
  {
    id: 10,
    name: "SSKM Hospital",
    beds: 1000,
    oxygen: true,
    lat: 22.5739,
    lng: 88.3639,
    address: "A.J.C. Bose Road, Bhowanipore, Kolkata, West Bengal 700020"
  }
];

// API Endpoints
app.get('/api/diprohospitals', (req, res) => {
  try {
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
});

// app.get('/api/donations', (req, res) => {
//   try {
//     res.json({
//       bloodDonors: 1254,
//       organDonors: 487,
//       transplants: 326
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch donation statistics' });
//   }
// });


// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/policereport')
// .then(() => {
//   console.log('MongoDB connected'); 
// })
// .catch((err) => {
//   console.error('DB connection error:', err);
// });

const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB Atlas using Mongoose
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});