import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentRouter = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const { id } = request.user;
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  return response.json(
    await appointmentsRepository.find({ where: { provider_id: id } }),
  );
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    return response.json(
      await createAppointmentService.execute({
        providerId: provider,
        date: parsedDate,
      }),
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
