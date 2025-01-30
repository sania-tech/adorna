import axios from 'axios'
import React, { useEffect, useState } from 'react'
import  { backendUrl,currency} from '../App'
import { toast } from 'react-toastify'

/**
 * List component to display and manage the product list.
 * 
 * @param {string} token - The token used for authentication.
 */
const List = ({ token }) => {

  // State to hold the list of products
  const [list, setList] = useState([])

  /**
   * Fetches the product list from the backend API.
   */
  const fetchList = async () => {
    try {
      // Make a GET request to fetch products
      const response = await axios.get(backendUrl + '/api/product/list')

      if (response.data.success) {
        // On successful response, reverse and set the product list
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message) // Show error if failure
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message) // Show error message in case of a network issue or exception
    }
  }

  /**
   * Removes a product from the list based on the given id.
   * 
   * @param {string} id - The id of the product to be removed.
   */
  const removeProduct = async (id) => {
    try {
      // Make a POST request to remove a product
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message) // Show success message after product is removed
        await fetchList(); // Refresh the product list
      } else {
        toast.error(response.data.message) // Show error if failure
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message) // Show error message in case of a network issue or exception
    }
  }

  // Fetch the product list when the component mounts
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      {/* Title for the list section */}
      <p className='mb-2'>All Products List</p>

      {/* Product list container */}
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Product List ------ */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              {/* Display product image */}
              <img className='w-12' src={item.image[0]} alt="" />

              {/* Display product name */}
              <p>{item.name}</p>

              {/* Display product category */}
              <p>{item.category}</p>

              {/* Display product price */}
              <p>{currency}{item.price}</p>

              {/* Action button to remove product */}
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List
