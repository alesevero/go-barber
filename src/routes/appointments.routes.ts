import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const haveAppointmentInSameDate = appointmentsRepository.isTimeReserved(
    parsedDate,
  );

  if (haveAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'An appointment is already scheduled at this time' });
  }

  return response.json(appointmentsRepository.create(provider, parsedDate));
});

export default appointmentsRouter;
