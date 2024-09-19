import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/routeIndex.js';

const init = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static('uploads'));

  // Define the MongoDB URI
  const mongoURI = process.env.MONGO_CONNECTION;

  // Connect to MongoDB with error handling
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error.message);
      // Optionally, you can handle the error further or shut down the server
      process.exit(1); // Exit the process with a failure code (optional)
    });

  // Initialize routes
  initRoutes(app);

  // Middleware to handle DB connection issues
  app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).send('Database connection failed');
    }
    next();
  });
}

export default init;
