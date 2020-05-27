import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    providerId,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );
    if (!appointments) {
      appointments = await this.appointmentRepository.findAllInDayForProvider({
        user: providerId,
        month,
        year,
        day,
      });

      await this.cacheProvider.save(cacheKey, appointments);
    }
    return appointments;
  }
}
