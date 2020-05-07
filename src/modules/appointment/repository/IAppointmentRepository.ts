import Appointment from '@modules/appointment/infra/typeorm/entity/Appointment';
import ICreateAppointmentDTO from '@modules/appointment/dto/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  isTimeReserved(date: Date, provider: string): Promise<boolean>;
}
