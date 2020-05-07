import { Router } from 'express';
import appointmentRouter from '@modules/appointment/infra/http/routes/appointments.routes';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import sessionRouter from '@modules/user/infra/http/routes/session.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
