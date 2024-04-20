// create cart page to show all the products in the cart and 

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, updateCart, removeFromCart, getUser, getProduct, removeProductFromCart } from "../../Helpers";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");

useEffect(() => {
  const getCartId = async () => {
    const cart = await getUser(document.cookie.split("=")[2]);
    console.log(cart.cart);
    setCartId(cart.cart); // Update cartId state
  };

  const fetchCart = async () => {
    // Fetch cart using the updated cartId state
    const cart = await getCart(cartId);
    setCartItems(cart.products);
  //  set total price of the cart by summing up the price of all the products in the cart
   

    // Fetch product details for each item in the cart
    const updatedCartItems = await Promise.all(
      cart.products.map(async (item) => {
        const product = await getProduct(item.product);
        return { ...item, product };
      })
    );
    setCartItems(updatedCartItems);
     const totalPrice = updatedCartItems.reduce(
       (acc, item) => acc + item.product.price * item.quantity,

       0
     );
     setTotalPrice(totalPrice);
  };

  getCartId(); // Fetch cartId
  fetchCart(); // Fetch cart using cartId
}, [cartId]);




  const handleQuantityChange = async (productId, quantity) => {
    // const updatedCart = await updateCart(productId, quantity);
    // setCartItems(updatedCart.items);
    // setTotalPrice(updatedCart.totalPrice);
  };

  const handleRemoveItem = async (productId) => {
    const updatedCart = await removeProductFromCart(cartId,productId);
    console.log(updatedCart.cart);
    setCartItems(updatedCart.cart.products);
    setTotalPrice(updatedCart.totalPrice);


    
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/products" className="text-blue-500">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">Price: ₹{item.product.price}</p>
                <div className="flex items-center">
                  <label className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    max={10}
                    onChange={(e) =>
                      handleQuantityChange(item.product._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-16"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
