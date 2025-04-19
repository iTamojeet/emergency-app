import express from "express";
import { createEmergencyReport } from "../controller/FirSubmitController.js";

const router=express.Router();

router.post("/fir_application",createEmergencyReport);

export default router;