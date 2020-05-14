import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import AppError from '@shared/error/AppError';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviderService = new ListProviderService(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const johnDoe = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const johnTre = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });
    const user = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({ id: user.id });
    expect(providers).toEqual([johnDoe, johnTre]);
  });
});
