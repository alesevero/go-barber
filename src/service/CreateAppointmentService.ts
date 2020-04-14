import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';

interface Request {
  providerId: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ providerId, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    if (
      await appointmentsRepository.isTimeReserved(appointmentDate, providerId)
    ) {
      throw Error('An appointment is already scheduled at this time');
    }

    const appointment = appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
