import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointment/service/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;
    const { id } = request.params;
    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );
    return response.json(
      await listProviderMonthAvailabilityService.execute({
        id,
        day: Number(day),
        month: Number(month),
        year: Number(year),
      }),
    );
  }
}
