// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {


  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden flex flex-row">
        
        <img
          src={product.image}
          alt={product.name}
          className=" h-72 bg-transparent object-cover"
        />
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Price: ₹{product.price}</span>
            <span className="text-sm">Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
