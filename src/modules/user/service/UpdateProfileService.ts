import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/user/repository/IUserRepository';
import IHashProvider from '@modules/user/providers/hashProvider/models/IHashProvider';
import AppError from '@shared/error/AppError';
import User from '../infra/typeorm/entity/User';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found');
    }

    const userWithNewEmail = await this.userRepository.findByEmail(email);
    if (userWithNewEmail && userWithNewEmail.id !== userId) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new AppError('Old password must be informed');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );
      if (!checkOldPassword) throw new AppError('Old password does not match');
      user.password = await this.hashProvider.generateHash(password);
    }
    return this.userRepository.save(user);
  }
}
