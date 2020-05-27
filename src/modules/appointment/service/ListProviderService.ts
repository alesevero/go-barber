import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/user/repository/IUserRepository';
// import AppError from '@shared/error/AppError';
import User from '@modules/user/infra/typeorm/entity/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: string;
}

@injectable()
export default class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `providers-list:${id}`,
    );

    if (!providers) {
      providers = await this.userRepository.findAllProviders({
        exceptId: id,
      });
    }

    await this.cacheProvider.save(`providers-list:${id}`, providers);

    return providers;
  }
}
