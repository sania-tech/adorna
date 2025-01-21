import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContest';  // Importing context to access products data
import Title from './Title';  // Importing Title component for displaying section title
import ProductItem from './ProductItem';  // Importing ProductItem to display each product

/**
 * BestSeller component renders a section showcasing the top 5 best-selling products.
 * 
 * @component
 * 
 * @example
 * // Example usage:
 * <BestSeller />
 * 
 * @returns {JSX.Element} Renders a section with the best-selling products, displaying a title, description, and product items.
 */
const BestSeller = () => {

  // Accessing products from ShopContext
  const { products } = useContext(ShopContext);

  // Local state to store best-selling products
  const [bestSeller, setBestSeller] = useState([]);

  // Effect hook to filter and update the best-selling products when 'products' change
  useEffect(() => {
    // Filtering products marked as bestsellers and taking the top 5
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));  // Update state with top 5 best sellers
  }, [products]);  // Dependency on products, so it re-runs whenever 'products' change

  return (
    <div className="my-10">
      {/* Section title */}
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        {/* Description text */}
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* Grid layout for best-selling products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {/* Mapping over the bestSeller array and rendering each ProductItem */}
        {
          bestSeller.map((item, index) => (
            <ProductItem 
              key={index}  // Unique key for each item
              id={item._id}  // Product ID
              name={item.name}  // Product name
              image={item.image}  // Product image
              price={item.price}  // Product price
            />
          ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
