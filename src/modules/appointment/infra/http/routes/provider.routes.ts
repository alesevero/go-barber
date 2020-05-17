import { Router } from 'express';
import ensureAuthenticated from '@modules/user/infra/http/middleware/ensureAuthenticated';
import ProviderMonthAvailabilityController from '@modules/appointment/infra/http/controller/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointment/infra/http/controller/ProviderDayAvailabilityController';
import { Segments, celebrate, Joi } from 'celebrate';
import ProviderController from '../controller/ProviderController';
import ProviderAppointmentsController from '../controller/ProviderAppointmentsController';

const providerRouter = Router();
const providerController = new ProviderController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerAppointmentsController = new ProviderAppointmentsController();

providerRouter.use(ensureAuthenticated);
providerRouter.get('/', providerController.index);
providerRouter.get(
  '/:id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providerRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index,
);
providerRouter.get('/:id/appointments', providerAppointmentsController.index);

export default providerRouter;
