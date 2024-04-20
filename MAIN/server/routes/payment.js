// create routes for payment

import express from "express";
import { createPayment, getPayments, getPaymentById, updatePayment } from "../controllers/payment.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/create",  createPayment);
router.get("/payments", getPayments);
router.get("/:paymentId", getPaymentById);
router.put("/:paymentId", verifyToken, updatePayment);

export default router;

