import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate regular users based on the JWT token.
 * 
 * This function checks if the request contains a valid token in the `Authorization` header.
 * It verifies the token and adds the decoded user ID to the request body. If the token is invalid or missing,
 * the user will be denied access with an error message.
 *
 * @async
 * @param {*} req - The request object containing the headers with the token.
 * @param {*} res - The response object used to send a success or error response.
 * @param {*} next - The next middleware to call if authentication is successful.
 * @returns {*} A JSON response with success or failure status.
 */
const authUser = async (req, res, next) => {
    // Retrieve the token from the request headers
    const { token } = req.headers;

    // If no token is provided, return an error message
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {
        // Decode and verify the JWT token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID from the token to the request body
        req.body.userId = token_decode.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error and return a failure message
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
