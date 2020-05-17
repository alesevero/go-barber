import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/user/service/UpdateProfileService';
import ShowProfileService from '@modules/user/service/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, oldPassword, password } = request.body;
    const updateUserAvatarService = container.resolve(UpdateProfileService);
    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      name,
      email,
      oldPassword,
      password,
    });
    return response.json(classToClass(user));
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const showProfileService = container.resolve(ShowProfileService);
    const user = await showProfileService.execute({
      id: request.user.id,
    });
    delete user.password;
    return response.json(classToClass(user));
  }
}
