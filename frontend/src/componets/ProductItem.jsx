import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContest';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Helper function for formatting price (in case there are decimals)
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt={`Image of ${name}`}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {formatPrice(price)}
      </p>
    </Link>
  );
};

export default ProductItem;

