import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContest';  // Importing ShopContext to access cart and pricing data
import Title from './Title';  // Importing Title component for displaying section title

/**
 * CartTotal component renders the total amounts in the shopping cart, including the subtotal, shipping fee, and total price.
 * 
 * @component
 * 
 * @example
 * // Example usage:
 * <CartTotal />
 * 
 * @returns {JSX.Element} Renders the cart totals section with subtotal, shipping fee, and total price.
 */
const CartTotal = () => {

  // Accessing data from the ShopContext for currency, delivery fee, and cart amount
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Cart Totals */}
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        
        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        
        {/* Total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
