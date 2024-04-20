// Import necessary modules and components
import React, { useState, useEffect } from "react";
import {
  createOrder,
  createPayment,
  deleteCart,
  getCart,
  getProduct,
  getToken,
  getUser,
} from "../../Helpers";
// import { set } from "mongoose";
// import { useHistory } from "react-router-dom";

// Checkout component
const Checkout = () => {
  // State variables to store form data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "Credit Card", // Default payment method
    paymentType: "cod", // Default payment type
  });
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  const [billingInfo, setBillingInfo] = useState({ ...shippingInfo });
  const [orderNotes, setOrderNotes] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState({});
  const [paymentid, setPayment] = useState({});
  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

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

  // History hook to redirect after successful checkout
  //   const history = useHistory();

  // Function to handle form submission

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
    if (isBillingSameAsShipping) {
      setBillingInfo({ ...billingInfo, [name]: value });
    }
  };

  // Function to handle billing address change
  const handleBillingAddressChange = (e) => {
    setIsBillingSameAsShipping(!isBillingSameAsShipping);
    if (!isBillingSameAsShipping) {
      setBillingInfo({ ...shippingInfo });
    }
  };

  const getUserDetails = async () => {
    const user = await getUser(document.cookie.split("=")[2]);
    return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await getUserDetails();
    setUser(user);

    setPopup(true);

    if (paymentid) {
      const orderDetails = {
        user: user._id,
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity,
        })),
        totalAmount: totalPrice,
        shippingAddress: shippingInfo.address,
        paymentType: shippingInfo.paymentType,

        // paymentid,
      };
      // console.log(paymentid);
      setOrder(orderDetails);

      // const order = async () => {
      //   const response = await createOrder(orderDetails);
      //   console.log(response);
      // };
      // order();
    } else {
      console.log("Payment not done");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const paymentID = e.target.paymentId.value;
    const paymentMethod = e.target.paymentMethod.value;
    const amount = e.target.amount.value;

    const response = await createPayment(
      user._id,
      cartId,
      paymentID,
      paymentMethod,
      amount
    );
    console.log(response.payment._id);

    setPayment(response.payment._id);
    // Callback to ensure paymentid is updated before proceeding
    handleFinalOrder(response.payment._id);
  };

  const handleFinalOrder = async (id) => {
    // add payment id to order details
    const updatedOrder = { ...order, paymentId: id };
    setOrder(updatedOrder);

    const response = await createOrder(updatedOrder);
    setOrderId(response.order._id);
    setOrderComplete(true);
    console.log(response);
    // delete cart
    const response1 = await deleteCart(cartId, user._id);
    console.log(response1);
    
   
  };

  // JSX for the checkout form
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-8 md:mr-4">
          <h2 className="text-lg font-semibold mb-2">Cart Items</h2>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.product._id}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover mr-2"
                  />
                  <span>{item.product.name}</span>
                </div>
                <span>
                  {item.quantity} x ₹{item.product.price}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-4">
            <span className="font-semibold">Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
        {/* Checkout Form */}

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 max-w-lg mx-auto"
        >
          {" "}
          <h2 className="text-lg font-semibold mb-2">Checkout Information</h2>
          {/* Shipping Information */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
            <input
              type="text"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded px-3 py-2 w-full mb-2"
              required
            />
            {/* Add more input fields for email, address, city, postal code, country */}
            {/* Example:
          <input type="email" name="email" value={shippingInfo.email} onChange={handleChange} placeholder="Email Address" className="border rounded px-3 py-2 w-full mb-2" required />
          */}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              placeholder="Address"
              className="border rounded px-3 py-2 w-full mb-2"
              required
            />


          </div>

          {/* Billing Information */}
          {!isBillingSameAsShipping && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Billing Information
              </h2>
              {/* Include input fields similar to shipping information */}
            </div>
          )}
          {/* Billing Address Checkbox */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isBillingSameAsShipping}
                onChange={handleBillingAddressChange}
                className="mr-2"
              />
              <span>Same as shipping address</span>
            </label>
          </div>
          {/* Order Notes */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Order Notes</h2>
            <textarea
              name="orderNotes"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Add any special instructions for your order"
              rows="4"
              className="border rounded px-3 py-2 w-full mb-2"
            ></textarea>
          </div>
          {/* payment type cod or prepaid */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Payment Type</h2>
            <select
              name="paymentType"
              value={shippingInfo.paymentType}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mb-2"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="prepaid">Prepaid</option>
              {/* Add more payment options as needed */}
            </select>
          </div>
          {/* Payment Method */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <select
              name="paymentMethod"
              value={shippingInfo.paymentMethod}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mb-2"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              {/* Add more payment options as needed */}
            </select>
          </div>
          {/* Terms and Conditions Checkbox */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mr-2"
              />
              <span>
                I agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>
              </span>
            </label>
          </div>
          {/* Checkout Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!agreeToTerms}
          >
            Place Order
          </button>
        </form>
        {/* popup */}
        {popup && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>
              {/* form */}
              <form onSubmit={handlePayment}>
                {/* user name  */}
                <label className="text-left">User Name</label>
                <input
                  type="text"
                  value={user.firstName}
                  className="border rounded px-3 py-2 w-full mb-2"
                  disabled
                  name="userName"
                />
                {/* cart id */}
                <label className="text-left">Cart Id</label>
                <input
                  type="text"
                  value={cartId}
                  className="border rounded px-3 py-2 w-full mb-2"
                  disabled
                  name="cartId"
                />
                {/* payment id generate automaticly */}
                <label className="text-left">Payment Id</label>
                <input
                  type="text"
                  value={Math.floor(Math.random() * 100000)}
                  className="border rounded px-3 py-2 w-full mb-2"
                  disabled
                  name="paymentId"
                />
                {/* payment method */}
                <input
                  type="text"
                  value={shippingInfo.paymentMethod}
                  className="border rounded px-3 py-2 w-full mb-2"
                  disabled
                  name="paymentMethod"
                />
                {/* total amount */}
                <label className="text-left">Total Amount</label>
                <input
                  type="text"
                  value={totalPrice}
                  className="border rounded px-3 py-2 w-full mb-2"
                  disabled
                  name="amount"
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Pay ₹{totalPrice}
                </button>
              </form>

              <button
                onClick={() => {
                  setPopup(false);
                  // history.push("/"); // Redirect to home page
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* open a popup on complete order and show orderid */}
        {orderComplete && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-4">Order Complete</h2>
              <p>Your order has been placed successfully!</p>
              <p>Your Order ID is: {orderId}</p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  // history.push("/"); // Redirect to home page
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
