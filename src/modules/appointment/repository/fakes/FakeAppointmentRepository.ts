import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointment/dto/ICreateAppointmentDTO';
import Appointment from '@modules/appointment/infra/typeorm/entity/Appointment';

export default class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });
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
}
