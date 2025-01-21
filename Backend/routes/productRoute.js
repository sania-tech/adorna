import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

// Creating an instance of express.Router for handling routes related to products
/**
 * Express router for handling product-related operations such as adding, removing, listing, and viewing a single product.
 * 
 * @const productRouter - Express Router instance to manage product routes.
 * 
 * @returns {*} productRouter - The configured product router with defined routes.
 */
const productRouter = express.Router();

/**
 * Route for adding a new product.
 * 
 * This route allows an admin to add a new product to the store. The admin must be authenticated using the adminAuth middleware.
 * 
 * @route POST /product/add
 * @access Private (requires admin authentication)
 * @param {object} image1, image2, image3, image4 - The images of the product to be uploaded. The multer middleware handles image uploads.
 * @param {string} name - The name of the product.
 * @param {string} description - The description of the product.
 * @param {number} price - The price of the product.
 * @param {string} category - The category of the product.
 * @param {string} subCategory - The sub-category of the product.
 * @param {Array} sizes - The available sizes of the product.
 * @param {boolean} bestseller - Whether the product is a bestseller.
 * @returns {object} JSON response indicating the success or failure of the operation.
 */
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

/**
 * Route for removing a product.
 * 
 * This route allows an admin to remove a product from the store. The admin must be authenticated using the adminAuth middleware.
 * 
 * @route POST /product/remove
 * @access Private (requires admin authentication)
 * @param {string} id - The ID of the product to be removed.
 * @returns {object} JSON response indicating the success or failure of the operation.
 */
productRouter.post('/remove', adminAuth, removeProduct);

/**
 * Route for fetching details of a single product.
 * 
 * This route retrieves detailed information about a specific product.
 * 
 * @route POST /product/single
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {object} JSON response containing the details of the requested product.
 */
productRouter.post('/single', singleProduct);

/**
 * Route for listing all products.
 * 
 * This route fetches a list of all products in the store.
 * 
 * @route GET /product/list
 * @returns {object} JSON response containing an array of all products in the store.
 */
productRouter.get('/list', listProducts);

export default productRouter;
