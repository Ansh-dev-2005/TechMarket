// create controllers for order


import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const createOrder = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const order = new Order(req.body);
    try {
      const savedOrder = await order.save();
      res.json({ order: savedOrder });
    } catch (err) {
      res.status(400).json({
        error: "NOT able to save order in DB",
      });
    }

}
);

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
    }
);

export const getUserOrders = asyncHandler(async (req, res) => {
    console.log(req.params);
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
    }
);

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
}
);

const updateOrder = asyncHandler(async (req, res) => {
    const { user, product, quantity, price, status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.user = user;
        order.product = product;
        order.quantity = quantity;
        order.price = price;
        order.status = status;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
}
);

const removeProductFromOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.product = null;
        order.quantity = 0;
        order.price = 0;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
}
);

const removeOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await order.remove();
        res.json({ message: "Order removed" });
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});


export { createOrder, getOrders, getOrderById, updateOrder, removeProductFromOrder, removeOrder };