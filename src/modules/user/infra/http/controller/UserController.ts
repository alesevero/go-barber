import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/user/service/CreateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const createUserService = container.resolve(CreateUserService);
      const user = await createUserService.execute({ name, email, password });
      delete user.password;
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
