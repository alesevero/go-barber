import { Router } from 'express';
import ForgotPasswordController from '@modules/user/infra/http/controller/ForgotPasswordController';
import ResetPasswordController from '@modules/user/infra/http/controller/ResetPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
    },
  }),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required().uuid(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
