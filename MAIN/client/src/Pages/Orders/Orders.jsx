import React, { useState, useEffect } from "react";
import { getOrderByUser } from "../../Helpers"; // Assuming you have a helper function to fetch user orders

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = document.cookie.split("=")[2];
        const userOrders = await getOrderByUser(userId); // Fetch user orders
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md p-4 rounded">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              {/* payemnt id */}
              <p>
                <strong>Payment ID:</strong> {order.paymentId}
              </p>
              {/* produnct names */}
              <p>
                <strong>Products:</strong>{" "}
                {order.products.map((product) => product.name).join(", ")}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              {order.items && (
                <ul>
                  <strong>Items:</strong>{" "}
                  {order.items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
