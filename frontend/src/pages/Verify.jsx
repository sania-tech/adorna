/**
 * Verify Component
 *
 * This component is responsible for verifying the payment status of an order after the user completes the payment process.
 * It listens for query parameters (`success` and `orderId`) from the URL and verifies the payment with the backend.
 * If the payment is successful, it clears the user's cart and navigates them to the "orders" page.
 * If the payment fails, it redirects the user back to the "cart" page.
 *
  This component is used as a route for the "payment verification" step after a successful Stripe payment. It works with the backend to ensure the payment has been successfully processed and updates the UI accordingly.
 *
 * @component
 */

import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContest'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    // Context values from the global ShopContext for authentication and cart management
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    
    // React Router hook to get the query parameters from the URL
    const [searchParams] = useSearchParams()
    
    // Extract query parameters for payment status (`success`) and order ID (`orderId`)
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    /**
     * Function to verify the payment status using the backend API.
     * Sends the payment status (`success`) and `orderId` to the server for validation.
     */
    const verifyPayment = async () => {
        try {

            // If the token doesn't exist, return null to prevent unnecessary API calls
            if (!token) {
                return null
            }

            // Make an API call to verify the Stripe payment using the order details
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })

            // If the payment verification is successful, clear the cart and navigate to orders page
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                // If verification fails, navigate back to the cart
                navigate('/cart')
            }

        } catch (error) {
            // Log any errors and show a toast error message to the user
            console.log(error)
            toast.error(error.message)
        }
    }

    // Run the verifyPayment function on component mount and whenever the token changes
    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>
            {/* Empty div as a placeholder for the component */}
        </div>
    )
}

export default Verify
