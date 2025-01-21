import multer from "multer";

/**
 * Setup for handling file uploads using Multer.
 * 
 * This configuration allows you to store uploaded files locally using the `diskStorage` engine. 
 * The filename of the uploaded file is set to its original name.
 * 
 * Multer handles `multipart/form-data` and can be used for handling file uploads in a Node.js application.
 * 
 * @const storage - Defines the storage configuration for Multer.
 * @const upload - Middleware used to handle the file upload process.
 * 
 * @returns {*} upload middleware to handle file uploads in routes.
 */
const storage = multer.diskStorage({
    /**
     * Function to determine the filename of the uploaded file.
     * 
     * @param {Object} req - The request object containing the file upload data.
     * @param {Object} file - The file being uploaded.
     * @param {Function} callback - Callback function to pass the filename.
     */
    filename: function(req, file, callback) {
        // Set the file name to the original name of the file
        callback(null, file.originalname);
    }
});

// Initialize the upload middleware using the storage configuration
const upload = multer({ storage });

export default upload;

