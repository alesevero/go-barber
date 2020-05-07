import { getRepository, Repository } from 'typeorm';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointment/dto/ICreateAppointmentDTO';
import Appointment from '../entity/Appointment';

export default class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async isTimeReserved(date: Date, provider: string): Promise<boolean> {
    return !!(await this.ormRepository.findOne({
      where: { date, provider },
    }));
  }
}
