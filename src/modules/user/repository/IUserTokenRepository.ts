import UserToken from '@modules/user/infra/typeorm/entity/UserToken';

export default interface IUserTokenRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
