// create a component to show case the latest products in the home page

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card_Square from '../Product-card/Card_Square'
import { getProducts } from '../../Helpers'

const Home_Products = () => {
    // fetch products from the database
    const [products, setProducts] = React.useState([])
    const [error, setError] = React.useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts()
            if (response) {
                setProducts(response)
                
            } else {
                setError("Something went wrong. Please try again later.")
            }


            console.log(response)
        }
        fetchProducts()
    }
    , [])

    return (
        <div className='p-4'>
            <h1>Top Picks</h1>
            {/* show error */}
            {error && <p>{error}</p>}

            {/* show products */}
            <div className="grid grid-cols-4 gap-4">
                {products.map((product, index1) => (
                    <Card_Square key={index1} product={product} />
                ))}


                
            </div>
        </div>
    )
}

export default Home_Products