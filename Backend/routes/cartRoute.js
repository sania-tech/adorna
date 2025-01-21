import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

// Creating an instance of express.Router for handling routes related to the shopping cart
/**
 * Express router for handling cart-related operations such as adding, updating, and retrieving the user's cart.
 * 
 * @const cartRouter - Express Router instance to manage cart routes.
 * 
 * @returns {*} cartRouter - The configured cart router with defined routes.
 */
const cartRouter = express.Router();

/**
 * Route for retrieving the current user's cart.
 * 
 * This route fetches the current cart data of a logged-in user. The user must be authenticated.
 * 
 * @route POST /cart/get
 * @access Private (requires user authentication)
 * @param {string} token - The JWT token to authenticate the user.
 * @returns {object} JSON response containing the user's cart data.
 */
cartRouter.post('/get', authUser, getUserCart);

/**
 * Route for adding an item to the user's cart.
 * 
 * This route allows a logged-in user to add an item to their shopping cart. The user must be authenticated.
 * 
 * @route POST /cart/add
 * @access Private (requires user authentication)
 * @param {object} item - The item details (e.g., product id, quantity) to be added to the cart.
 * @returns {object} JSON response indicating the success or failure of the operation.
 */
cartRouter.post('/add', authUser, addToCart);

/**
 * Route for updating an item in the user's cart.
 * 
 * This route allows a logged-in user to update the quantity or details of an item in their cart. 
 * The user must be authenticated.
 * 
 * @route POST /cart/update
 * @access Private (requires user authentication)
 * @param {object} item - The updated item details to replace the existing item in the cart.
 * @returns {object} JSON response indicating the success or failure of the operation.
 */
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
