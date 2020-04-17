import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../model/User';
import uploadConfig from '../config/upload';
import AppError from '../error/AppError';

interface Request {
  userId: string;
  filename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, filename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('Only authenticated users can change its avatar', 401);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      if (await fs.promises.stat(userAvatarFilePath)) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;
    userRepository.save(user);
    return user;
  }
}
