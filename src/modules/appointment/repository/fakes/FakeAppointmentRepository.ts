import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointment/dto/ICreateAppointmentDTO';
import Appointment from '@modules/appointment/infra/typeorm/entity/Appointment';
import IFindAllInMonthForProviderDTO from '@modules/appointment/dto/IFindAllInMonthForProviderDTO';
import IFindAllInDayForProviderDTO from '@modules/appointment/dto/IFindAllInDayForProviderDTO';

export default class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
    this.appointments.push(appointment);
    return appointment;
  }

  public async isTimeReserved(date: Date, provider: string): Promise<boolean> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) && appointment.provider_id === provider,
    );
    return !!findAppointment;
  }

  public async findAllInMonthForProvider({
    user,
    month,
    year,
  }: IFindAllInMonthForProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === user &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments || [];
  }

  public async findAllInDayForProvider({
    user,
    day,
    month,
    year,
  }: IFindAllInDayForProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === user &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    return appointments || [];
  }
}
