import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

/**
 * Creates a JWT token for user authentication.
 *
 * @param {string} id - The ID of the user to include in the token payload.
 * @returns {string} The generated JWT token.
 */
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

/**
 * Handles the user login process.
 *
 * @async
 * @param {*} req - The request object containing `email` and `password` for user login.
 * @param {*} res - The response object used to send the success or error response.
 * @returns {unknown} A JSON response with the success status and JWT token if login is successful, or an error message.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in the database
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Handles the user registration process.
 *
 * @async
 * @param {*} req - The request object containing `name`, `email`, and `password` for user registration.
 * @param {*} res - The response object used to send the success or error response.
 * @returns {unknown} A JSON response with the success status and JWT token if registration is successful, or an error message.
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format and password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Handles the admin login process.
 *
 * @async
 * @param {*} req - The request object containing `email` and `password` for admin login.
 * @param {*} res - The response object used to send the success or error response.
 * @returns {*} A JSON response with the success status and JWT token if login is successful, or an error message.
 */
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the credentials match the admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin };
