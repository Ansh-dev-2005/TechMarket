// create a gallery component to showcase the latest offers images

import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import image from "../../Assets/front2.jpg"

const Gallery = () => {
const [currentProduct, setCurrentProduct] = useState(0);

const handleNextProduct = () => {
    setCurrentProduct((prevProduct) => prevProduct + 1);
};

const handlePrevProduct = () => {
    setCurrentProduct((prevProduct) => prevProduct - 1);
};
return (
    <div className=" h-full">
        {/* show image */}
        <div className="flex mt-0 justify-center">
            <img
                src={image}
                alt="product"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
        </div>
    </div>
);

}

export default Gallery