import React, { useEffect, useState } from 'react'
import { getCategories } from '../../Helpers';

const Header = () => {
    const[category, setCategory] = useState([])

    // fetch all categories

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories()
            setCategory(categories)
            console.log(categories)
        }
        fetchCategories()

    }
    , [])



    return (
        <div className="header_section h-10 bg-gray-800 text-white font-mono">
            {/* a hamburger menu*/}

            {/* list all categories */}
            <ul className="category_list flex space-x-12 mt-auto mb-auto font-thin justify-center">
                {category.map((cat, index) => (
                    <a href={`/category/${cat._id}`}>
                        <li key={index} className="cursor-pointer hover:text-gray-400">
                            {cat.name}
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    );
}

export default Header
