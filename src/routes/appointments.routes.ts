import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentRouter = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  return response.json(await appointmentsRepository.find());
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    return response.json(
      await createAppointmentService.execute({ provider, date: parsedDate }),
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
