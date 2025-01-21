/**
 * RelatedProducts Component
 *
 * This component displays a list of related products based on a selected category and sub-category.
 * It filters the products from the global `ShopContext` and displays the top 5 related items. 
 * The component also uses the `ProductItem` component to render each product's details.
 
 */
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContest'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {

    // Retrieve the products from the ShopContext
    const { products } = useContext(ShopContext);

    // State to hold the filtered related products
    const [related, setRelated] = useState([]);

    // useEffect hook to filter products whenever the products list changes
    useEffect(() => {

        // Check if products are available
        if (products.length > 0) {
            let productsCopy = products.slice();

            // Filter products by category and sub-category
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            // Set the related products state with the first 5 items
            setRelated(productsCopy.slice(0, 5));
        }

    }, [products, category, subCategory]); // Re-run the effect when products, category, or subCategory change

    return (
        <div className='my-24'>
            <div className=' text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {/* Render the related products */}
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts;
