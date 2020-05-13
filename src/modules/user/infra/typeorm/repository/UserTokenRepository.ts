import { getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/user/repository/IUserTokenRepository';
import UserToken from '../entity/UserToken';

export default class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id: userId,
    });

    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: { token },
    });
  }
}
