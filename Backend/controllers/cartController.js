// add products to user cart
/**
 * Adds an item to the user's cart or updates the quantity of an existing item.
 *
 * @async
 * @param {*} req - The request object containing `userId`, `itemId`, and `size`.
 * @param {*} res - The response object used to send the response.
 * @returns {*} A JSON response indicating success or failure with a message.
 */
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// update user cart
/**
 * Updates the quantity of a specific item in the user's cart.
 *
 * @async
 * @param {*} req - The request object containing `userId`, `itemId`, `size`, and `quantity`.
 * @param {*} res - The response object used to send the response.
 * @returns {*} A JSON response indicating success or failure with a message.
 */
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get user cart data
/**
 * Retrieves the user's cart data.
 *
 * @async
 * @param {*} req - The request object containing `userId`.
 * @param {*} res - The response object used to send the cart data.
 * @returns {*} A JSON response with the user's cart data or an error message.
 */
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
