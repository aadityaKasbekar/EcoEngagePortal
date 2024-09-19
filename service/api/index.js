import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import initRoutes from './routes/routeIndex.js'; // Keep this if you have routes defined in another file

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default port to 3000 if not set in .env

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB URI
const mongoURI = process.env.MONGO_CONNECTION;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });

// Middleware to handle MongoDB connection issues
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).send('Database connection failed');
  }
  next();
});

// Initialize routes (if using)
initRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
