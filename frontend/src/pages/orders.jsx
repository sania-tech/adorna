// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContest';
import Title from '../componets/Title';
import axios from 'axios';

// Orders component: Displays the list of orders made by the logged-in user.
const Orders = () => {

  // Extract necessary context variables
  const { backendUrl, token, currency } = useContext(ShopContext);

  // State to store order data
  const [orderData, setorderData] = useState([]);

  // Function to load the user's order data
  const loadOrderData = async () => {
    try {
      // If no token is found (user not logged in), return null
      if (!token) {
        return null;
      }

      // Make an API request to fetch orders of the logged-in user
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

      if (response.data.success) {
        // Process the fetched orders and add status, payment info, and other order details to each item
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        // Reverse the order list so that latest orders come first
        setorderData(allOrdersItem.reverse());
      }

    } catch (error) {
      // Error handling if API request fails
      console.log(error);
    }
  };

  // Load the order data when the component mounts or when the token changes
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      {/* Title section */}
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Order listing */}
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              {/* Order details */}
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              {/* Order status and Track button */}
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// Export the Orders component for use in other parts of the application
export default Orders;

