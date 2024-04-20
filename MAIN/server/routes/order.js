// create routes for order

import express from "express";
import { createOrder, getOrders, getOrderById, updateOrder, getUserOrders } from "../controllers/order.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/create",  createOrder);
router.get("/orders", getOrders);
router.get("/:orderId", getOrderById);
router.put("/:orderId", verifyToken, updateOrder);
router.get("/user/:userId", getUserOrders);

export default router;
