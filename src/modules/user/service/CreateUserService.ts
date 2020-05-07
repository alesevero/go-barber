import { injectable, inject } from 'tsyringe';
import AppError from '@shared/error/AppError';
import User from '@modules/user/infra/typeorm/entity/User';
import IUserRepository from '@modules/user/repository/IUserRepository';
import IHashProvider from '@modules/user/providers/hashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    if (await this.userRepository.findByEmail(email)) {
      throw new AppError('Email address already in use', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
