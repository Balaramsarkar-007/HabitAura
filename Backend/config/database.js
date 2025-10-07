const mongoose = require('mongoose');
require('dotenv').config();

const mongo_Url = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        if(!mongo_Url){
            throw new Error("MongoDB connection string is not defined in environment variables");
        }

        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 50000, 
            maxPoolSize: 10,
            minPoolSize: 5, 
        }

        const conn = await mongoose.connect(mongo_Url, options);

        console.log(`MongoDB connected: ${conn.connection.host}`);

        // handel conncetions events
        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 5000); // Retry connection after 5 seconds
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

        // gradful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to application termination');
            process.exit(0);
        })
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

const isDBConnected = () => {
    return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, isDBConnected };