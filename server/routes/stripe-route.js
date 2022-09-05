import express from "express";
import { createStripe } from "../controllers/stripe-ctrl.js";

const router = express.Router();

router.post("/stripe/payment", createStripe);

export default router;
