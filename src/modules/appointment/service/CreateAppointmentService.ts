import ptBR, { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointment/infra/typeorm/entity/Appointment';
import AppError from '@shared/error/AppError';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appoitmentRepository: IAppointmentRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    providerId,
    userId,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment for a past date');
    }
    if (userId === providerId)
      throw new AppError('You cannot create an appointment with yourself');

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError(
        'You can only schedule appointments between 8am and 17pm',
      );

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
      user_id: userId,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para o dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${providerId}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );
    return appointment;
  }
}
