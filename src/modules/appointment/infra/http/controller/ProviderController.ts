import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderService from '@modules/appointment/service/ListProviderService';
import { classToClass } from 'class-transformer';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviderService = container.resolve(ListProviderService);
    const providers = await listProviderService.execute({
      id: request.user.id,
    });
    return response.json(classToClass(providers));
  }
}
