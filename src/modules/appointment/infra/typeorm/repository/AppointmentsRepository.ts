import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointment/dto/ICreateAppointmentDTO';
import IFindAllInMonthForProviderDTO from '@modules/appointment/dto/IFindAllInMonthForProviderDTO';
import IFindAllInDayForProviderDTO from '@modules/appointment/dto/IFindAllInDayForProviderDTO';
import Appointment from '../entity/Appointment';

export default class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id,
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async isTimeReserved(date: Date, provider: string): Promise<boolean> {
    return !!(await this.ormRepository.findOne({
      where: { date, provider },
    }));
  }

  public async findAllInMonthForProvider({
    user,
    month,
    year,
  }: IFindAllInMonthForProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    return (
      this.ormRepository.find({
        where: {
          provider_id: user,
          date: Raw(
            dateFieldName =>
              `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
          ),
        },
      }) || []
    );
  }

  public async findAllInDayForProvider({
    user,
    day,
    month,
    year,
  }: IFindAllInDayForProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');
    return (
      this.ormRepository.find({
        where: {
          provider_id: user,
          date: Raw(
            dateFieldName =>
              `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
          ),
        },
        relations: ['user'],
      }) || []
    );
  }
}
