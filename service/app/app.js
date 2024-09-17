import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/index.js';

const init = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded())

  app.use('/uploads', express.static('uploads'));

  mongoose.connect(process.env.MONGO_CONNECTION);
  initRoutes(app);
}

export default init;
