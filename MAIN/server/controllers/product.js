// create controller for product

import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const createProduct = asyncHandler(async (req, res) => {
  console.log(req);
  const errors = validationResult(req);
  console.log(errors);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.json({ product: savedProduct });
  } catch (err) {
    res.status(400).json({
      error: "NOT able to save product in DB",
    });
  }
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
    }
);

const getProductById = asyncHandler(async (req, res) => {
  console.log(req.params);
    const product = await Product.findById(req.params.productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}
);

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, status, brand, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.status = status;
        product.brand = brand;
        product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
}
);

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}
);

const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.categoryId });
    res.json(products);
    }
);


export { createProduct,getProductsByCategory, getProducts, getProductById, updateProduct, deleteProduct };