// create controller for brand

import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const createBrand = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const brand = new Brand(req.body);
    try {
      const savedBrand = await brand.save();
      res.json({ brand: savedBrand });
    } catch (err) {
      res.status(400).json({
        error: "NOT able to save brand in DB",
      });
    }

    }
);

const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.json(brands);
    }
);

const getBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
        res.json(brand);
    } else {
        res.status(404);
        throw new Error("Brand not found");
    }
}
);

const updateBrand = asyncHandler(async (req, res) => {
    const { name, description, image, status } = req.body;
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        brand.name = name;
        brand.description = description;
        brand.image = image;
        brand.status = status;

        const updatedBrand = await brand.save();
        res.json(updatedBrand);
    }
    else {
        res.status(404);
        throw new Error("Brand not found");
    }
}
);

export { createBrand, getBrands, getBrandById, updateBrand };