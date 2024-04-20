// create model for brand

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const brandSchema = Schema(
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

brandSchema.plugin(mongoosePaginate);
const Brand = model("Brand", brandSchema);

export default Brand;