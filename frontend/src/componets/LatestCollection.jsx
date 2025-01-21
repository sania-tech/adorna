import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContest';
import Title from './Title';
import ProductItem from './ProductItem';

/**
 * LatestCollection component displays the latest products available for sale 
 * in a grid layout, showcasing up to 10 of the most recent items.
 * 
 * @component
 * 
 * @example
 * // Example usage:
 * <LatestCollection />
 * 
 * @returns {JSX.Element} Renders the latest product collection with a title and a grid of products.
 */
const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Selects the first 10 products from the 'products' array to display as the latest collection
        setLatestProducts(products.slice(0, 10));
    }, [products]);

  return (
    <div className='my-10'>
      {/* Section Title and Description */}
      <div className='text-center py-8 text-3xl'>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover our latest arrivals at Adorna! From trendy designs to timeless pieces, 
            explore our collection to find something special that suits your style.
          </p>
      </div>

      {/* Rendering Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection;
