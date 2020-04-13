import { isEqual } from 'date-fns';
import Appointment from '../model/Appointment';

export default class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }

  public isTimeReserved(date: Date): Appointment | null {
    const exists = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return exists || null;
  }
}
