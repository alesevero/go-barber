import IUserTokenRepository from '@modules/user/repository/IUserTokenRepository';
import UserToken from '@modules/user/infra/typeorm/entity/UserToken';
import { uuid } from 'uuidv4';

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.tokens.find(tkn => tkn.token === token);
    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(userToken);

    return userToken;
  }
}
