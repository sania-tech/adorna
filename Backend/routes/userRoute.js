import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

// Creating an instance of express.Router for handling routes related to users
/**
 * Express router for handling user-related operations such as registration, login, and admin login.
 * 
 * @const userRouter - Express Router instance to manage user routes.
 * 
 * @returns {*} userRouter - The configured user router with defined routes.
 */
const userRouter = express.Router();

/**
 * Route for user registration.
 * 
 * This route allows new users to register by providing their name, email, and password.
 * 
 * @route POST /user/register
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user.
 * @returns {object} JSON response indicating success or failure of the registration.
 */
userRouter.post('/register', registerUser);

/**
 * Route for user login.
 * 
 * This route allows users to log in by providing their email and password.
 * 
 * @route POST /user/login
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} JSON response containing a token if login is successful or error message if not.
 */
userRouter.post('/login', loginUser);

/**
 * Route for admin login.
 * 
 * This route allows an admin to log in by providing the correct admin credentials (email and password).
 * 
 * @route POST /user/admin
 * @param {string} email - The admin's email.
 * @param {string} password - The admin's password.
 * @returns {object} JSON response containing a token if admin login is successful or error message if not.
 */
userRouter.post('/admin', adminLogin);

export default userRouter;
