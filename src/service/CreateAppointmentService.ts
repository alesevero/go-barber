import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(repository: AppointmentsRepository) {
    this.appointmentsRepository = repository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    if (this.appointmentsRepository.isTimeReserved(appointmentDate)) {
      throw Error('An appointment is already scheduled at this time');
    }

    return this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
  }
}
