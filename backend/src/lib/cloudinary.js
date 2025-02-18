import {v2 as cloudinary} from "cloudinary"

import {config} from 'dotenv'

dotenv.config();


if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("❌ Missing Cloudinary environment variables. Please check your .env file.");
    process.exit(1); // Stop the application if variables are missing
};


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});





export default cloudinary;