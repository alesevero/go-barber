import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/error/AppError';
import User from '@modules/user/infra/typeorm/entity/User';
import IUserRepository from '@modules/user/repository/IUserRepository';
import IHashProvider from '@modules/user/providers/hashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const passwordMacthed = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMacthed) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}
