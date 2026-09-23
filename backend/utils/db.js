import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    // If already connected, reuse existing connection (crucial for serverless environments)
    if (isConnected || mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        const errorMsg = "MONGO_URI is missing from environment variables! Please check your Vercel Project Settings > Environment Variables.";
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Fail quickly if MongoDB is unreachable
        });
        isConnected = !!conn.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

export default connectDB;