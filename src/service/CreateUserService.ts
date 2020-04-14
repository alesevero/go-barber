import { getRepository } from 'typeorm';
import User from '../model/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    if (await userRepository.findOne({ where: { email } })) {
      throw new Error('Email address already in use');
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);
    return user;
  }
}
