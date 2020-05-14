import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderService from '@modules/appointment/service/ListProviderService';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviderService = container.resolve(ListProviderService);
    return response.json(
      await listProviderService.execute({
        id: request.user.id,
      }),
    );
  }
}
