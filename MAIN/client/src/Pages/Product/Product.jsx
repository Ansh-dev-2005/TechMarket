import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProduct,
  getRelatedProducts,
  addProductToCart,
  getAuthToken,
  getUser,
  createCart,
  getToken,
  getProductsFromCategory,
} from "../../Helpers";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import ProductCard from "../../Components/Product-card/Card_Rectangle";
import Header from "../../Components/Navbar/Header";
// import { get } from "mongoose";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
    };
    fetchProductDetails();
  }, [id]); // Only fetch product details when id changes

  useEffect(() => {
    if (product && product.category) {
      const fetchRelatedProducts = async () => {
        try {
          const response = await getProductsFromCategory(product.category);
          setRelatedProducts(response || []);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchRelatedProducts();
    }
  }, [product]); // Only fetch related products when product or product.category changes

  const handleAddToCart = async () => {
    // addProductToCart(product, quantity);
    // Optionally, navigate to the cart page
    // verify if user contains any existing cart
    // if not create a new cart
    const user1 = await getUser(document.cookie.split("=")[2]);
    console.log(user1);
    if (user1.cart) {
      // add product to cart
      const cartid = user1.cart;

      const cart = await addProductToCart(
        cartid,
        product,
        quantity,
        product.price,
        quantity * product.price
      );
      console.log(cart);
    } else {
      const token = await getToken();
      console.log(token);
      const cart = await createCart(user1._id, token);
      console.log(cart);
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}

        <div className=" mt-10 px-36 grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:max-w-lg rounded-lg mx-auto"
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>

            {product && product.description ? (
              <ul className="list-disc mb-6">
                {product.description.map((desc, index) => (
                  <li key={index} className="mb-1">
                    {desc}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No description available</p>
            )}

            <p className="text-xl font-semibold mb-6">
              Price: ₹{product.price}
            </p>

            {/* Product Rating */}
            <div className="flex items-center mb-6">
              <span className="mr-2 text-lg font-semibold">Rating:</span>
              {Array.from(Array(5).keys()).map((index) => (
                <FaStar
                  key={index}
                  color={index < product.rating ? "#ffc107" : "#e4e5e9"}
                  className="h-6 w-6"
                />
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-2 text-lg font-semibold">Quantity:</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded px-3 py-2 w-16 text-lg"
                min={1}
                max={10} // Limit the maximum quantity
              />
            </div>
            {/* Total Price */}
            <p className="text-lg font-semibold mb-6">
              Total Amount: ₹{product.price * quantity}
            </p>

            {/* Add to Cart Button */}
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-lg font-semibold mt-8">Related Products</h2>
          <div className="container mx-auto mt-8 px-4">
            {/* <h2 className="text-2xl font-semibold mb-4">
          Products in {categoryId} category:
        </h2> */}
            <div className=" justify-center">
              {relatedProducts.map((product) => (
                <div key={product._id} className=" mx-4 my-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
