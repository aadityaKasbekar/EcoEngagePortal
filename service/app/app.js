import cors from 'cors';
import express from 'express';
// import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb'
import initRoutes from './routes/routeIndex.js';

const init = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static('uploads'));

  // Define the MongoDB URI
  const mongoURI = process.env.MONGO_CONNECTION;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(mongoURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // // Connect to MongoDB with error handling
  // mongoose.connect(mongoURI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  //   .then(() => {
  //     console.log('Connected to MongoDB successfully');
  //   })
  //   .catch((error) => {
  //     console.error('Failed to connect to MongoDB:', error.message);
  //     // Optionally, you can handle the error further or shut down the server
  //     process.exit(1); // Exit the process with a failure code (optional)
  //   });

  // Initialize routes
  initRoutes(app);

  // Middleware to handle DB connection issues
  // app.use((req, res, next) => {
  //   if (mongoose.connection.readyState !== 1) {
  //     return res.status(500).send('Database connection failed');
  //   }
  //   next();
  // });
}

export default init;
