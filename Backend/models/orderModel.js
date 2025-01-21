import mongoose from 'mongoose';

/**
 * Schema definition for an order in the e-commerce application.
 * 
 * This schema outlines the structure of an order document in the MongoDB database,
 * including fields such as user ID, items, amount, address, status, payment method,
 * payment status, and the date of the order.
 * 
 * @const orderSchema - Mongoose schema defining the structure of an order document.
 * @const orderModel - Mongoose model based on the orderSchema for interacting with the 'orders' collection.
 * 
 * @returns {*} orderModel - Mongoose model for the 'orders' collection.
 */
const orderSchema = new mongoose.Schema({
    /**
     * Unique identifier for the user placing the order.
     * 
     * @type {String}
     * @required
     */
    userId: { type: String, required: true },

    /**
     * Array of items included in the order.
     * 
     * @type {Array}
     * @required
     */
    items: { type: Array, required: true },

    /**
     * Total amount for the order.
     * 
     * @type {Number}
     * @required
     */
    amount: { type: Number, required: true },

    /**
     * Shipping address for the order.
     * 
     * @type {Object}
     * @required
     */
    address: { type: Object, required: true },

    /**
     * Current status of the order.
     * 
     * @type {String}
     * @default 'Order Placed'
     * @required
     */
    status: { type: String, required: true, default: 'Order Placed' },

    /**
     * Payment method used for the order.
     * 
     * @type {String}
     * @required
     */
    paymentMethod: { type: String, required: true },

    /**
     * Indicates whether the payment has been completed.
     * 
     * @type {Boolean}
     * @default false
     * @required
     */
    payment: { type: Boolean, required: true, default: false },

    /**
     * Timestamp of when the order was placed.
     * 
     * @type {Number}
     * @required
     */
    date: { type: Number, required: true }
});

/**
 * Mongoose model for the 'orders' collection.
 * 
 * This model provides an interface to interact with the 'orders' collection in the MongoDB database,
 * allowing for operations such as creating, reading, updating, and deleting order documents.
 * 
 * @type {mongoose.Model}
 */
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
