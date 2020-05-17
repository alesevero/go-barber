import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import Appointment from '../infra/typeorm/entity/Appointment';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    providerId,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayForProvider(
      {
        user: providerId,
        month,
        year,
        day,
      },
    );
    return appointments;
  }
}
