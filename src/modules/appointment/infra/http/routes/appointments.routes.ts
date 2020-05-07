import { Router } from 'express';
import ensureAuthenticated from '@modules/user/infra/http/middleware/ensureAuthenticated';
import AppointmentController from '../controller/AppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.use(ensureAuthenticated);
appointmentRouter.post('/', appointmentController.create);

export default appointmentRouter;
