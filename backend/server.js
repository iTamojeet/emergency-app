import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import smsRoutes from "./src/routes/smsRoutes.js";
import hospitalFetchRoute from "./src/routes/hospitalFetchRoute.js";
import newhospitalRoute from "./src/routes/newhospitalRoute.js";
import policestationRoute from "./src/routes/policeStationRoute.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import { loadHospitalsAtStartup } from "./src/services/loadHospitals.js";
import hospitalSearchRoute from "./src/routes/hospitalSearchRoute.js";

dotenv.config();

// ES Modules path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// EJS Setup (if used)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Routes
app.use("/", smsRoutes);
app.use("/api/hospital", newhospitalRoute);
app.use("/api/police", policestationRoute);
app.use("/api/donations", donationRoutes);
app.use("/api", hospitalFetchRoute);
app.use("/api", hospitalSearchRoute);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Server startup function
async function startServer() {
  try {
    // Connect DB first
    await connectDB();
    console.log("✅ Database connected.");

    // Pre-load hospital data
    await loadHospitalsAtStartup();

    // Start listening
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
}

// Start everything
startServer();
