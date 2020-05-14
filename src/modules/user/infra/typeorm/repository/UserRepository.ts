import { getRepository, Repository, Not } from 'typeorm';
import IUserRepository from '@modules/user/repository/IUserRepository';
import ICreateUserDTO from '@modules/user/dto/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/user/dto/IFindAllProvidersDTO';
import User from '../entity/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    exceptId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (exceptId) {
      return this.ormRepository.find({
        where: {
          id: Not(exceptId),
        },
      });
    }
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
