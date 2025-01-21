import { v2 as cloudinary } from "cloudinary";

// Function to configure Cloudinary using environment variables
const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,  // Cloud name from your Cloudinary account
    api_key: process.env.CLOUDINARY_API_KEY,  // API key from your Cloudinary account
    api_secret: process.env.CLOUDINARY_SECRET_KEY,  // API secret from your Cloudinary account
  });
}

export default connectCloudinary;
