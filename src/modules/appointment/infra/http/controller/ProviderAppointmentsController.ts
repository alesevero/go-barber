import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointment/service/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.body;
    const { id } = request.params;
    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );
    return response.json(
      await listProviderAppointmentsService.execute({
        providerId: id,
        day,
        month,
        year,
      }),
    );
  }
}
