import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import AppError from '@shared/error/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import ShowProfileService from './ShowProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;
let createUserService: CreateUserService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    showProfileService = new ShowProfileService(fakeUserRepository);
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to show the profile', async () => {
    const user = await createUserService.execute({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    const updatedUser = await showProfileService.execute({
      id: user.id,
    });

    expect(updatedUser.name).toBe('Teste da Silva');
    expect(updatedUser.email).toBe('teste@teste.com');
  });
  it('should not be able to show the profile of a non-existing user', async () => {
    await expect(
      showProfileService.execute({
        id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
