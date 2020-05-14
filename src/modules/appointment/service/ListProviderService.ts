import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/user/repository/IUserRepository';
// import AppError from '@shared/error/AppError';
import User from '@modules/user/infra/typeorm/entity/User';

interface IRequest {
  id: string;
}

@injectable()
export default class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User[]> {
    return this.userRepository.findAllProviders({
      exceptId: id,
    });
  }
}
