import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connecting to MongoDB using the URI stored in environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
      useNewUrlParser: true,  // Use the new URL parser to avoid deprecation warnings
      useUnifiedTopology: true,  // Use the new Server Discover and Monitoring engine
    });
    console.log("DB Connected");  // Log success message on successful connection
  } catch (error) {
    console.error("DB Connection Error:", error);  // Log error message if connection fails
    process.exit(1);  // Exit the process with failure status code
  }
};

export default connectDB;

