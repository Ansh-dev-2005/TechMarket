// CategoryPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsFromCategory } from "../../Helpers/index";
import ProductCard from "../../Components/Product-card/Card_Rectangle";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Navbar/Header"
const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsFromCategory(categoryId);
        // search for category id from response
        const category = response.find((cat) => cat._id === categoryId);
        console.log(category);
        setProducts(response || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="container mx-auto mt-8 px-4">
        {/* <h2 className="text-2xl font-semibold mb-4">
          Products in {categoryId} category:
        </h2> */}
        <div className=" justify-center">
          {products.map((product) => (
            <div key={product._id} className=" mx-4 my-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
