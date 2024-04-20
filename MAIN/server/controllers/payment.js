// create controller for payment

import Payment from "../models/Payment.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const createPayment = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const payment = new Payment(req.body);
    console.log(req.body);
    try {
      const savedPayment = await payment.save();
      res.json({ payment: savedPayment });
    } catch (err) {
      res.status(400).json({
        error: "NOT able to save payment in DB",
      });
    }

}
);

const getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({});
    res.json(payments);
    }
);

const getPaymentById = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    if (payment) {
        res.json(payment);
    } else {
        res.status(404);
        throw new Error("Payment not found");
    }
}
);


const updatePayment = asyncHandler(async (req, res) => {
    const { user, order, paymentMethod, amount, status } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (payment) {
        payment.user = user;
        payment.order = order;
        payment.paymentMethod = paymentMethod;
        payment.amount = amount;
        payment.status = status;

        const updatedPayment = await payment.save();
        res.json(updatedPayment);
    }

    else {
        res.status(404);
        throw new Error("Payment not found");
    }

}
);

export { createPayment, getPayments, getPaymentById, updatePayment };