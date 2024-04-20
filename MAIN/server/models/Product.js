// create model for product

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: [String], // make it an array of strings
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: false,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { timestamps: true }
);

productSchema.plugin(mongoosePaginate);
const Product = model("Product", productSchema);

export default Product;