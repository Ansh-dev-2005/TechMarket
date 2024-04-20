// create model for category

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },
        description: {
        type: String,
        required: false,
        trim: true,
        },
        image: {
        type: String,
        required: false,
        trim: true,
        },
        status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        },
        
        
      
        
    },
    { timestamps: true }
    );

categorySchema.plugin(mongoosePaginate);
const Category = model("Category", categorySchema);

export default Category;