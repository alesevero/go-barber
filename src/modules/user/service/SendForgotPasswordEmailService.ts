import { injectable, inject } from 'tsyringe';
import path from 'path';
import AppError from '@shared/error/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/user/repository/IUserRepository';
import IUserTokenRepository from '@modules/user/repository/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private usetTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const { token } = await this.usetTokenRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          likn: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
