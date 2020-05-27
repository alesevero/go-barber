import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;
let fakeCacheProvider: ICacheProvider;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
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
