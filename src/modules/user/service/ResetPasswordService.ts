import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/user/repository/IUserRepository';
import IUserTokenRepository from '@modules/user/repository/IUserTokenRepository';
import IHashProvider from '@modules/user/providers/hashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/error/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) throw new AppError('User token does not exists');

    if (isAfter(Date.now(), addHours(userToken.created_at, 2)))
      throw new AppError('Token expired');
    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User does not exists');

    user.password = await this.hashProvider.generateHash(password);
    await this.userRepository.save(user);
  }
}
