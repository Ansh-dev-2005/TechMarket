// create routes for cart


import express from "express";
import { createCart, getCarts, getCartById, updateCart, removeCart, removeProductFromCart, addProductToCart } from "../controllers/cart.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createCart);
router.post("/:id/add-product", addProductToCart);
router.get("/carts", getCarts);
router.get("/:cartId", getCartById);
router.put("/:cartId", verifyToken, updateCart);
router.delete("/delete/:cartId",  removeCart);
router.delete("/delete/product/:cartId",  removeProductFromCart);

export default router;