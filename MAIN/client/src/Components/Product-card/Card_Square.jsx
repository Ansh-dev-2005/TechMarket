import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductCategory, getProductsByCategory } from '../../Helpers';

const Card_Square = ({ product }) => {
    const [category, setCategory] = React.useState('');
    // Fetch the category of the product
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            if (response) {
                console.log(response);
                setCategory(response[0].name)

            }
        }
        fetchCategories();
    }, []);
    // const category =  getProductCategory(product.category);
    // console.log(category);
const truncateWords = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <div className="flex  justify-center">
            <img
              src={product.image}
              alt={product.name}
              className=" h-60 object-cover object-center"
            />
          </div>
        </Link>
        <div className="p-4 bg-gray-800">
          <h2 className="font-semibold text-lg text-white">
            {truncateWords(product.name, 5)}
          </h2>
          <p className="text-sm text-white">{category}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-bold text-white">
              {product.price}
            </span>
            <Link to="/product" className="text-white">
              View
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Card_Square 