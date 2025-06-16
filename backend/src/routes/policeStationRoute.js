import express from "express";
import { createPoliceStation, policeLogin } from "../controllers/policeStationController.js";

const router = express.Router();

router.post('/register', createPoliceStation);
router.post('/login', policeLogin);

export default router;
