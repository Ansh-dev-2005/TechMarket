import React, { useEffect, useState } from "react";
import { Link, Route, Navigate, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCookies } from "react-cookie";
import ReactSearchBox from "react-search-box";
import { getProducts } from "../../Helpers";

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token] = useCookies(["user"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Something went wrong. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (token.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  const logout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedIn(false);
    console.log("User logged out");
  };

  const navigate = useNavigate();

  const handleProductSelect = (record) => {
    navigate(`/product/${record.item.key}`);
  };

  return (
    <nav
      className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <Link
        to="/"
        className="pl-8 scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        TechMarket
      </Link>
      <div className="flex items-center">
        <ReactSearchBox
          placeholder="Search..."
          value=""
          data={products.map((product) => ({
            key: product._id,
            value: product.name,
          }))}
          onSelect={(record) => handleProductSelect(record)}
          inputBoxClassName="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          callback={(record) => console.log(record)}
        />
      </div>
      {loggedIn ? (
        <div>
          <Link to="/profile" className="p-4">
            Profile
          </Link>
          <Link to="/orders" className="p-4">
            Orders
          </Link>
          <Link to="/cart" className="p-4">
            Cart
          </Link>
          <Link to="/login" onClick={logout} className="p-4">
            Logout
          </Link>
        </div>
      ) : (
        <div className="pr-8 flex">
          <Link to="/login" className="p-4">
            Login
          </Link>
          <Link to="/register" className="p-4">
            Register
          </Link>
          <Link to="/cart" className="p-4">
            <FaShoppingCart />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
