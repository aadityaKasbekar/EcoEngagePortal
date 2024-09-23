import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/routeIndex.js';

const connectToDatabase = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
    });
    console.log('Successfully connected to MongoDB using Mongoose!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1)
  }
};

const init = (app) => {
  // Middleware setup
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));

  // MongoDB URI from environment variables
  const mongoURI = process.env.MONGO_CONNECTION;

  // Connect to MongoDB
  connectToDatabase(mongoURI);

  // Initialize application routes
  initRoutes(app);
};

export default init;
