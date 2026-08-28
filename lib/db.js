
import mongoose from 'mongoose';

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB
async function connectDB() {
    // If connection exists, return it
    if (cached.conn) {
        return cached.conn;
    }

    // If no connection exists but there's a connecting promise, wait for it
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        // Create new connection promise
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        // Wait for connection
        cached.conn = await cached.promise;
    } catch (e) {
        // Clear promise on error
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
