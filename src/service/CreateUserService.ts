import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';
import AppError from '../error/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    if (await userRepository.findOne({ where: { email } })) {
      throw new AppError('Email address already in use', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}
