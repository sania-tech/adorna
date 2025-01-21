/**
 * Cart Component
 * 
 * The Cart component displays the user's shopping cart, showing the products that have been added 
 * to the cart along with their quantities and sizes. The component provides functionality for 
 * updating the quantity of items in the cart and removing items by clicking on a delete icon. 
 * It also displays the total amount for the items in the cart and provides a button to proceed to 
 * checkout. The component makes use of the `ShopContext` to access the list of products, cart items, 
 * currency, and the method to update item quantities.
 * 
 * Key Features:
 * - Displays a list of cart items with product details, quantity, and size.
 * - Allows the user to update the quantity of items in the cart.
 * - Provides the ability to remove items from the cart.
 * - Displays the total price for the items in the cart.
 * - Provides a button to proceed to the checkout page.
 * 
 * @component
 * @example
 * return (
 *   <Cart />
 * )
 */

import React, { useContext, useEffect, useState } from 'react'; // Importing React hooks and context
import { ShopContext } from '../context/ShopContest'; // Importing ShopContext to manage global state
import Title from '../componets/Title'; // Importing the Title component
import { assets } from '../assets/assets'; // Importing assets for images like the bin icon
import CartTotal from '../componets/CartTotal'; // Importing the CartTotal component for calculating the total

/**
 * The Cart component renders the shopping cart page, showing each item in the cart with its details, 
 * quantity, and size. Users can update item quantities, remove items, and proceed to checkout.
 * It uses the ShopContext to get products, cart data, and a function to update the quantity.
 * 
 * @returns {JSX.Element} The rendered Cart page content.
 */
const Cart = () => {

  // Destructuring the necessary state and methods from ShopContext
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  // State to hold the processed cart data
  const [cartData, setCartData] = useState([]);

  // useEffect to update cartData when cartItems or products change
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      // Iterating through cartItems to create an array of objects with product info
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData); // Updating the cartData state
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>

      {/* Cart Page Title */}
      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Rendering the Cart Items */}
      <div>
        {
          cartData.map((item, index) => {
            // Finding the product data from the products array using the item ID
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className=' flex items-start gap-6'>
                  {/* Displaying the product image */}
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    {/* Product Name and Size */}
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      {/* Product Price and Size */}
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity input field */}
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />

                {/* Delete item button */}
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )

          })
        }
      </div>

      {/* Cart Total Section */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
            {/* Checkout Button */}
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cart;
