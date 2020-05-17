import { Router } from 'express';
import SessionController from '@modules/user/infra/http/controller/SessionController';
import { Segments, celebrate, Joi } from 'celebrate';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
