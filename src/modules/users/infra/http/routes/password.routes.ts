import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const usersRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

usersRouter.post('/forgot', forgotPasswordController.create);
usersRouter.post('/reset', resetPasswordController.create);

export default usersRouter;
