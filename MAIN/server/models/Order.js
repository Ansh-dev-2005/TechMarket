// create a model for order

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = Schema(
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
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        paymentType: {
            type: String,
            enum: ["cod", "prepaid"],
            default: "cod",
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: "Payment",
            required: false,
        },


        status: {
            type: String,
            enum: ["pending","packed","shipped", "completed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);
const Order = model("Order", orderSchema);

export default Order;
