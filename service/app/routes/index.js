import eventRouter from './event-route.js'
import authRouter from './auth-routes.js';
import commentCreationRouter from "./comment-routes.js";
import postRouter from "./post-routes.js";
import initiativesRouter from './initiative-routes.js';

const initRoutes = (app) => {
  // Default route for root path
  app.get('/', (req, res) => {
    res.send('Welcome to the EcoEngage API!');
  });
  // Route logging for debugging
  app.use('/auth', authRouter);
  app.use('/comments', commentCreationRouter);
  app.use('/events', eventRouter);
  app.use('/posts', postRouter);
  app.use('/initiatives', initiativesRouter);
};

export default initRoutes;
