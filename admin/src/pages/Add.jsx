import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

/**
 * The Add component allows an admin user to add new product details including images, name, 
 * description, category, price, sizes, and whether the product is a bestseller. 
 * It interacts with an API to submit the form data to the backend.
 * 
 * @param {Object} props - The component props
 * @param {string} props.token - The authorization token used for API requests
 * 
 * @returns {JSX.Element} The rendered Add component
 */
const Add = ({token}) => {

  // State variables for managing form inputs and selected images
  const [image1,setImage1] = useState(false)   // First image file input
  const [image2,setImage2] = useState(false)   // Second image file input
  const [image3,setImage3] = useState(false)   // Third image file input
  const [image4,setImage4] = useState(false)   // Fourth image file input

  // Product attributes states
  const [name, setName] = useState("");        // Product name
  const [description, setDescription] = useState(""); // Product description
  const [price, setPrice] = useState("");      // Product price
  const [category, setCategory] = useState("Men"); // Product category (default: "Men")
  const [subCategory, setSubCategory] = useState("Topwear"); // Product sub-category (default: "Topwear")
  const [bestseller, setBestseller] = useState(false); // Whether the product is a bestseller
  const [sizes, setSizes] = useState([]);      // Sizes available for the product

  /**
   * Handles form submission to add a new product.
   * It collects form data, formats it, and sends it to the backend via a POST request.
   * 
   * @param {Object} e - The form submit event
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Create a new FormData object to handle form submissions with files
      const formData = new FormData()

      // Append product details to formData
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes)) // Convert sizes array to string

      // Append image files to formData if selected
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      // Send POST request to backend API to add the product
      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})

      // Handle success or error response from API
      if (response.data.success) {
        toast.success(response.data.message)
        // Reset the form after successful submission
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        {/* Image Upload Section */}
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2'>
            {/* Image 1 */}
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
            </label>
            {/* Image 2 */}
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
            </label>
            {/* Image 3 */}
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
            </label>
            {/* Image 4 */}
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
        </div>

        {/* Product Name Input */}
        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        {/* Product Description Input */}
        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required/>
        </div>

        {/* Category, Subcategory, and Price Inputs */}
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            {/* Product Category Select */}
            <div>
              <p className='mb-2'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Product Subcategory Select */}
            <div>
              <p className='mb-2'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            {/* Product Price Input */}
            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            </div>
        </div>

        {/* Sizes Selection */}
        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            {/* Sizes S, M, L, XL, XXL */}
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add
