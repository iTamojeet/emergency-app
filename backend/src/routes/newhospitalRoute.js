import express from "express";
import { createHospital, hospitalLogin } from "../controller/newhospitalController.js";

const router = express.Router();

router.post('/register', createHospital);
router.post('/login', hospitalLogin);

export default router;
