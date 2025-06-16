import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';
// import { createServer } from 'http';
// import socketManager from './src/websocket/socketManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import smsRoutes from './src/routes/smsRoutes.js';
import hospitalFetchRoute from './src/routes/hospitalFetchRoute.js';


// ES Modules path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//import routes
import donationRoutes from './src/routes/donationRoutes.js';
//import emergencyRoutes from "./src/routes/firRoute.js"

dotenv.config();

const app = express();
//const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
// app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));
//FOR EJS USE ONLY 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Routes
//app.use('/api', emergencyRoutes);
app.use('/api/donations', donationRoutes);
app.use('/', smsRoutes);
app.use('/api', hospitalFetchRoute);                        //SMS Route

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