import mongoose from "mongoose";

/**
 * Schema definition for a user in the e-commerce application.
 * 
 * This schema outlines the structure of a user document in the MongoDB database,
 * including fields such as name, email, password, and cartData.
 * 
 * @const userSchema - Mongoose schema defining the structure of a user document.
 * @const userModel - Mongoose model based on the userSchema for interacting with the 'users' collection.
 * 
 * @returns {*} userModel - Mongoose model for the 'users' collection.
 */
const userSchema = new mongoose.Schema({
    /**
     * Name of the user.
     * 
     * @type {String}
     * @required
     */
    name: { type: String, required: true },

    /**
     * Email address of the user.
     * 
     * @type {String}
     * @required
     * @unique - Ensures the email is unique across all users.
     */
    email: { type: String, required: true, unique: true },

    /**
     * Password of the user (hashed).
     * 
     * @type {String}
     * @required
     */
    password: { type: String, required: true },

    /**
     * Cart data of the user (default is an empty object).
     * 
     * @type {Object}
     * @default {} - If no cart data is provided, an empty object is used.
     */
    cartData: { type: Object, default: {} }
}, { minimize: false }); // { minimize: false } ensures that empty objects are not removed.

 /**
 * Mongoose model for the 'users' collection.
 * 
 * This model provides an interface to interact with the 'users' collection in the MongoDB database,
 * allowing for operations such as creating, reading, updating, and deleting user documents.
 * 
 * @type {mongoose.Model}
 */
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
