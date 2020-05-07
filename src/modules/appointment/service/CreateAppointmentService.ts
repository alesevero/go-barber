import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointment/infra/typeorm/entity/Appointment';
import AppError from '@shared/error/AppError';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';

interface IRequest {
  providerId: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appoitmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ providerId, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (
      await this.appoitmentRepository.isTimeReserved(
        appointmentDate,
        providerId,
      )
    ) {
      throw new AppError(
        'An appointment is already scheduled at this time',
        400,
      );
    }

    const appointment = await this.appoitmentRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}
