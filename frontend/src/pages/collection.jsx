// The Collection component is responsible for displaying a collection of products with options for filtering and sorting. It manages state for categories, subcategories, and sorting types. 
// Additionally, it listens to search input and filters the products accordingly.

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContest'
import { assets } from '../assets/assets';
import Title from '../componets/Title';
import ProductItem from '../componets/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);  // Extracting necessary context values from ShopContext
  const [showFilter, setShowFilter] = useState(false);  // State to toggle the visibility of filter options
  const [filterProducts, setFilterProducts] = useState([]);  // State to store filtered products
  const [category, setCategory] = useState([]);  // State to store selected categories for filtering
  const [subCategory, setSubCategory] = useState([]);  // State to store selected subcategories for filtering
  const [sortType, setSortType] = useState('relavent');  // State to store sorting preference

  // Function to toggle category filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));  // Remove category if already selected
    } else {
      setCategory(prev => [...prev, e.target.value]);  // Add category if not selected
    }
  }

  // Function to toggle subcategory filter
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));  // Remove subcategory if already selected
    } else {
      setSubCategory(prev => [...prev, e.target.value]);  // Add subcategory if not selected
    }
  }

  // Function to apply filters based on selected categories and subcategories
  const applyFilter = () => {
    let productsCopy = products.slice();  // Copy of the products array to manipulate

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));  // Apply search filter
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));  // Apply category filter
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));  // Apply subcategory filter
    }

    setFilterProducts(productsCopy);  // Update filtered products
  }

  // Function to apply sorting based on selected sort type (low-high, high-low)
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();  // Copy of the filtered products array

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));  // Sort by price (low to high)
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));  // Sort by price (high to low)
        break;

      default:
        applyFilter();  // Apply filters when no sorting is selected
        break;
    }
  }

  // UseEffect hook to apply filters when category, subcategory, or search criteria change
  useEffect(() => {
    applyFilter();  // Apply filters whenever category, subcategory, search, or showSearch changes
  }, [category, subCategory, search, showSearch, products]);

  // UseEffect hook to apply sorting when the sort type changes
  useEffect(() => {
    sortProduct();  // Apply sorting based on selected sort type
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection;

