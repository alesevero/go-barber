import { Router } from 'express';
import ensureAuthenticated from '@modules/user/infra/http/middleware/ensureAuthenticated';
import ProviderMonthAvailabilityController from '@modules/appointment/infra/http/controller/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointment/infra/http/controller/ProviderDayAvailabilityController';
import ProviderController from '../controller/ProviderController';

const providerRouter = Router();
const providerController = new ProviderController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providerRouter.use(ensureAuthenticated);
providerRouter.get('/', providerController.index);
providerRouter.get(
  '/:id/month-availability',
  providerMonthAvailabilityController.index,
);
providerRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index,
);

export default providerRouter;
