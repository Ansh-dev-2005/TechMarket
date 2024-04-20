// create a model for payment

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const paymentSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
        },
        paymentID: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

paymentSchema.plugin(mongoosePaginate);
const Payment = model("Payment", paymentSchema);

export default Payment;