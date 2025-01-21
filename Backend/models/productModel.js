import mongoose from "mongoose";

/**
 * Schema definition for a product in the e-commerce application.
 * 
 * This schema outlines the structure of a product document in the MongoDB database,
 * including fields such as name, description, price, images, category, sub-category,
 * sizes, bestseller flag, and the date the product was added.
 * 
 * @const productSchema - Mongoose schema defining the structure of a product document.
 * @const productModel - Mongoose model based on the productSchema for interacting with the 'products' collection.
 * 
 * @returns {*} productModel - Mongoose model for the 'products' collection.
 */
const productSchema = new mongoose.Schema({
    /**
     * Name of the product.
     * 
     * @type {String}
     * @required
     */
    name: { type: String, required: true },

    /**
     * Description of the product.
     * 
     * @type {String}
     * @required
     */
    description: { type: String, required: true },

    /**
     * Price of the product.
     * 
     * @type {Number}
     * @required
     */
    price: { type: Number, required: true },

    /**
     * Array of image URLs associated with the product.
     * 
     * @type {Array}
     * @required
     */
    image: { type: Array, required: true },

    /**
     * Category of the product (e.g., "Electronics", "Clothing").
     * 
     * @type {String}
     * @required
     */
    category: { type: String, required: true },

    /**
     * Subcategory of the product (e.g., "Smartphones", "T-Shirts").
     * 
     * @type {String}
     * @required
     */
    subCategory: { type: String, required: true },

    /**
     * Array of available sizes for the product (e.g., ["S", "M", "L"]).
     * 
     * @type {Array}
     * @required
     */
    sizes: { type: Array, required: true },

    /**
     * Indicates if the product is a bestseller.
     * 
     * @type {Boolean}
     * @optional
     */
    bestseller: { type: Boolean },

    /**
     * Timestamp of when the product was added to the store.
     * 
     * @type {Number}
     * @required
     */
    date: { type: Number, required: true }
});

/**
 * Mongoose model for the 'products' collection.
 * 
 * This model provides an interface to interact with the 'products' collection in the MongoDB database,
 * allowing for operations such as creating, reading, updating, and deleting product documents.
 * 
 * @type {mongoose.Model}
 */
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

