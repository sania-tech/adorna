import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

/**
 * Orders component to display and manage customer orders.
 * 
 * @param {string} token - The authentication token.
 */
const Orders = ({ token }) => {

  // State to hold the list of orders
  const [orders, setOrders] = useState([])

  /**
   * Fetches all orders from the backend API.
   */
  const fetchAllOrders = async () => {

    // If no token is provided, return null to prevent making the API request
    if (!token) {
      return null;
    }

    try {
      // Make a POST request to fetch orders
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })

      if (response.data.success) {
        // Reverse the orders list for display
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message) // Show error message if unsuccessful
      }

    } catch (error) {
      toast.error(error.message) // Show error message if an exception occurs
    }
  }

  /**
   * Handles the status update of an order.
   * 
   * @param {object} event - The event object from the select input.
   * @param {string} orderId - The ID of the order being updated.
   */
  const statusHandler = async (event, orderId) => {
    try {
      // Make a POST request to update the order status
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })

      if (response.data.success) {
        // Refresh the orders list after the status is updated
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message) // Show error message if an exception occurs
    }
  }

  // Fetch all orders when the component mounts or when the token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      {/* Orders page header */}
      <h3>Order Page</h3>

      {/* Orders list container */}
      <div>
        {
          // Loop through each order and display its details
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>

              {/* Display parcel icon */}
              <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />

              {/* Display order items */}
              <div>
                <div>
                  {order.items.map((item, index) => {
                    // Check if the current item is the last one and format it accordingly
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span></p>
                    }
                    else {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                    }
                  })}
                </div>

                {/* Display customer information */}
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              {/* Display order details */}
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Display order amount */}
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>

              {/* Dropdown to update order status */}
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
