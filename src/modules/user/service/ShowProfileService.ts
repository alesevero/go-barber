import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/user/repository/IUserRepository';
import AppError from '@shared/error/AppError';
import User from '../infra/typeorm/entity/User';

interface IRequest {
  id: string;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
