import { injectable, inject } from 'tsyringe';
import AppError from '@shared/error/AppError';
import User from '@modules/user/infra/typeorm/entity/User';
import IUserRepository from '@modules/user/repository/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  userId: string;
  filename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, filename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Only authenticated users can change its avatar', 401);
    }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const avatarFilename = await this.storageProvider.saveFile(filename);

    user.avatar = avatarFilename;
    this.userRepository.save(user);
    return user;
  }
}
