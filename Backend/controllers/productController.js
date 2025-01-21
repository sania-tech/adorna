import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

/**
 * Adds a new product to the database.
 *
 * @async
 * @param {*} req - The request object containing product details: `name`, `description`, `price`, `category`, `subCategory`, `sizes`, `bestseller`, and images.
 * @param {*} res - The response object used to send a success or error response.
 * @returns {*} A JSON response indicating the success or failure of the product addition.
 */
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Handling the product images
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Uploading images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Preparing product data
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        // Saving product data to the database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Retrieves all products from the database.
 *
 * @async
 * @param {*} req - The request object (no additional data is needed from the client).
 * @param {*} res - The response object used to send a success response along with the list of products.
 * @returns {*} A JSON response with the list of all products or an error message.
 */
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Removes a product from the database.
 *
 * @async
 * @param {*} req - The request object containing the `id` of the product to remove.
 * @param {*} res - The response object used to send a success or error message.
 * @returns {*} A JSON response indicating whether the product was removed or an error occurred.
 */
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Retrieves detailed information of a single product.
 *
 * @async
 * @param {*} req - The request object containing `productId` of the product to retrieve.
 * @param {*} res - The response object used to send the product data or error message.
 * @returns {*} A JSON response with the product data or an error message.
 */
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct };


