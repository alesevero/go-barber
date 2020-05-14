import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointment/service/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );
    const { provider, date } = request.body;
    const userId = request.user.id;
    const parsedDate = parseISO(date);
    return response.json(
      await createAppointmentService.execute({
        providerId: provider,
        userId,
        date: parsedDate,
      }),
    );
  }
}
