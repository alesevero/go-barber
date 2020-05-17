import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/user/service/AuthenticateUserService';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });
    return response.json({ token, user: classToClass(user) });
  }
}
