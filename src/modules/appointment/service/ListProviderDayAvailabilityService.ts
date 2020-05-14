import { injectable, inject } from 'tsyringe';
import { isAfter, getHours } from 'date-fns';
// import AppError from '@shared/error/AppError';
import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';

interface IRequest {
  id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayForProvider(
      {
        user: id,
        month,
        year,
        day,
      },
    );
    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + 8);

    const currentDate = new Date(Date.now());
    const availability = eachHourArray.map(hour => {
      const hasAppoinmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppoinmentInHour && isAfter(compareDate, currentDate),
      };
    });
    return availability;
  }
}
