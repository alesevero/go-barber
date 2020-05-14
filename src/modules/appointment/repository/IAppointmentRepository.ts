import Appointment from '@modules/appointment/infra/typeorm/entity/Appointment';
import ICreateAppointmentDTO from '@modules/appointment/dto/ICreateAppointmentDTO';
import IFindAllInMonthForProviderDTO from '../dto/IFindAllInMonthForProviderDTO';
import IFindAllInDayForProviderDTO from '../dto/IFindAllInDayForProviderDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  isTimeReserved(date: Date, provider: string): Promise<boolean>;
  findAllInMonthForProvider(
    data: IFindAllInMonthForProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayForProvider(
    data: IFindAllInDayForProviderDTO,
  ): Promise<Appointment[]>;
}
