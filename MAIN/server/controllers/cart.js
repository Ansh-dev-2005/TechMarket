// create controllers for cart

import Cart from "../models/cart.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from '../models/User.js'; // Import the User model file

const createCart = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const cart = new Cart(req.body);
    try {
      const savedCart = await cart.save();
    //   also add the cart to the user's cart array
    //   await User.findByIdAndUpdate
        console.log(req.auth._id);
        // save cart id to user schema
                console.log("helo", savedCart._id);

        const user = await User.findById(req.auth._id);
        user.cart = savedCart._id;
        await user.save();


      

      res.json({ cart: savedCart });
    } catch (err) {
      res.status(400).json({
        error: "NOT able to save cart in DB",
      });
    }

}
);

const getCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find({});
    res.json(carts);
    }
);

const getCartById = asyncHandler(async (req, res) => {
    console.log(req.params);
    const cart = await Cart.findById(req.params.cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404);
        throw new Error("Cart not found");
    }
}
);

const updateCart = asyncHandler(async (req, res) => {
    const { product, user, quantity, price } = req.body;
    const cart = await Cart.findById(req.params.id);

    if (cart) {
        cart.product = product;
        cart.user = user;
        cart.quantity = quantity;
        cart.price = price;

        const updatedCart = await cart.save();
        res.json(updatedCart);
    }
    else {
        res.status(404);
        throw new Error("Cart not found");
    }
}
);


const removeProductFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cartId);
  if (cart) {
    const productId = req.body.product;
    console.log(productId);

    // Filter out the product with the matching productId
    cart.products = cart.products.filter(
      (product) => product.product.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

const removeCart = asyncHandler(async (req, res) => {
    console.log(req.params.cartId);
    const cart = await Cart.findById(req.params.cartId);
    console.log(cart);
    if (cart) {
        // make status of cart to false
        cart.status = "inactive";
        await cart.save();
        res.json({ message: 'Cart removed' });
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

const addProductToCart = asyncHandler(async (req, res) => {
    const { product, quantity,  total } = req.body;
    const price = req.body.product.price;
    console.log(req.body.product.price);
    const cart = await Cart.findById(req.params.id);
    if (cart) {
        const productExist = cart.products.find(p => p.product.toString() === product);
        if (productExist) {
            productExist.quantity = quantity;
            productExist.price = price;
            productExist.total = total;
        } else {
            cart.products.push({ product, quantity, price, total });
        }
        await cart.save();
        res.json({ message: 'Product added to cart' });
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// export const removeProductFromCart = asyncHandler(async (req, res) => {
//     const cart = await Cart.findById(req.params.cartId);
//     if (cart) {
//         const productId = req.params.productId;
//         cart.products = cart.products.filter(product => product._id.toString() !== productId);
//         await cart.save();
//         res.json({ message: 'Product removed from cart' });
//     } else {
//         res.status(404);
//         throw new Error('Cart not found');
//     }
// }
// );



export { createCart, getCarts, getCartById, updateCart, removeProductFromCart, removeCart, addProductToCart };
