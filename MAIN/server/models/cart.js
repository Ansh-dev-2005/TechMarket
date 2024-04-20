import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// create a model for cart


const cartSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                total: {
                    type: Number,
                    required: true,
                },
            }
        ],
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

cartSchema.plugin(mongoosePaginate);
const Cart = model("Cart", cartSchema);
export default Cart;