// create routes for product

import express from "express";
import { createProduct, getProducts, getProductById, updateProduct, getProductsByCategory } from "../controllers/product.js";
import { isSignedIn, isAuthenticated, isAdmin, verifyToken } from "../controllers/auth.js";
import { createBrand } from "../controllers/brand.js";
import { createCategory, getCategories, getCategoryById } from "../controllers/category.js";
// import { getProductCategory } from "../../client/src/Helpers/index.js";

const router = express.Router();

router.post("/create",verifyToken,   createProduct);
router.get("/products", getProducts);
router.get("/categories", getCategories);
router.get("/category/:categoryId", getCategoryById);
router.get("/find/:productId", getProductById);
router.put("/edit/:productId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.post("/brand/create",createBrand);
router.post("/category/create", createCategory)
router.get("/products/:categoryId", getProductsByCategory);
export default router;
