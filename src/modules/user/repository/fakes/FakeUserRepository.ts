import IUserRepository from '@modules/user/repository/IUserRepository';
import ICreateUserDTO from '@modules/user/dto/ICreateUserDTO';
import User from '@modules/user/infra/typeorm/entity/User';
import { uuid } from 'uuidv4';

export default class UserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(
      user,
      {
        id: uuid(),
      },
      userData,
    );
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(item => item.id === user.id);
    this.users[index] = user;
    return user;
  }
}
