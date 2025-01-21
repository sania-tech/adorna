import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

// Creating an instance of express.Router for handling routes related to orders
/**
 * Express router for handling order-related operations including placing orders, viewing orders, updating order status, and verifying payments.
 * 
 * @const orderRouter - Express Router instance to manage order routes.
 * 
 * @returns {*} orderRouter - The configured order router with defined routes.
 */
const orderRouter = express.Router();

// **Admin Features**

// Route for getting all orders (Admin only).
/**
 * Route for the admin to get all orders.
 * 
 * @route POST /order/list
 * @param {string} token - Admin's authentication token.
 * @returns {array} JSON response containing the list of all orders.
 */
orderRouter.post('/list', adminAuth, allOrders);

// Route for updating the status of an order (Admin only).
/**
 * Route for the admin to update the status of an order.
 * 
 * @route POST /order/status
 * @param {string} token - Admin's authentication token.
 * @param {object} status - The new status of the order.
 * @returns {object} JSON response indicating the success or failure of the status update.
 */
orderRouter.post('/status', adminAuth, updateStatus);

// **Payment Features**

// Route for placing an order with payment via Stripe.
 /**
 * Route for users to place an order and make payment using Stripe.
 * 
 * @route POST /order/stripe
 * @param {string} token - User's authentication token.
 * @param {object} paymentData - Payment details for Stripe.
 * @returns {object} JSON response with success or failure of order placement.
 */
orderRouter.post('/stripe', authUser, placeOrderStripe);

// Route for placing an order with payment via Razorpay.
 /**
 * Route for users to place an order and make payment using Razorpay.
 * 
 * @route POST /order/razorpay
 * @param {string} token - User's authentication token.
 * @param {object} paymentData - Payment details for Razorpay.
 * @returns {object} JSON response with success or failure of order placement.
 */
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// Route for placing an order without specifying payment method.
 /**
 * Route for users to place an order without specifying payment method.
 * 
 * @route POST /order/place
 * @param {string} token - User's authentication token.
 * @param {object} orderData - Order details without payment.
 * @returns {object} JSON response with success or failure of order placement.
 */
orderRouter.post('/place', authUser, placeOrder);

// **User Features**

// Route for fetching a user's orders.
 /**
 * Route for users to get all their orders.
 * 
 * @route POST /order/userorders
 * @param {string} token - User's authentication token.
 * @returns {array} JSON response containing the list of user's orders.
 */
orderRouter.post('/userorders', authUser, userOrders);

// **Payment Verification**

 // Route for verifying Stripe payment.
 /**
 * Route to verify Stripe payment after order.
 * 
 * @route POST /order/verifyStripe
 * @param {string} token - User's authentication token.
 * @param {object} paymentData - Stripe payment verification data.
 * @returns {object} JSON response indicating success or failure of payment verification.
 */
orderRouter.post('/verifyStripe', authUser, verifyStripe);

// Route for verifying Razorpay payment.
 /**
 * Route to verify Razorpay payment after order.
 * 
 * @route POST /order/verifyRazorpay
 * @param {string} token - User's authentication token.
 * @param {object} paymentData - Razorpay payment verification data.
 * @returns {object} JSON response indicating success or failure of payment verification.
 */
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter;
