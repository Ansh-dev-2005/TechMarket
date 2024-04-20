// create controller for category

import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const createCategory = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const category = new Category(req.body);
    try {
      const savedCategory = await category.save();
      res.json({ category: savedCategory });
    } catch (err) {
      res.status(400).json({
        error: "NOT able to save category in DB",
      });

    }

});

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
    }
);

const getCategoryById = asyncHandler(async (req, res) => {
    console.log(req.params);
    const category = await Category.findById(req.params.categoryId);
    if (category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
}
);

const updateCategory = asyncHandler(async (req, res) => {
    const { name, description, image, status } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = name;
        category.description = description;
        category.image = image;
        category.status = status;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    }
    else {
        res.status(404);
        throw new Error("Category not found");
    }
}
);

export { createCategory, getCategories, getCategoryById, updateCategory };
