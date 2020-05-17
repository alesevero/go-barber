import { Router } from 'express';
import ensureAuthenticated from '@modules/user/infra/http/middleware/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentController from '../controller/AppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.use(ensureAuthenticated);
appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      providerId: Joi.string().required().uuid(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.create,
);

export default appointmentRouter;
