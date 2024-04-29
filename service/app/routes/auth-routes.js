import express from 'express';
import * as authController from "../controllers/auth-controller.js"

const authRouter = express.Router();

authRouter.route('/signup')
    .post(authController.signUp);

authRouter.route('/signin')
    .post(authController.signIn);

authRouter.route('/user')
    .get(authController.getUser)
    .patch(authController.updateUser);

authRouter.route('/forgotPassword')
    .post(authController.changePassword);

export default authRouter;