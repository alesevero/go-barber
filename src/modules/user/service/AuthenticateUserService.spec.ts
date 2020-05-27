import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/user/service/AuthenticateUserService';
import FakeHashProvider from '@modules/user/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/error/AppError';

describe('AuthenticateUserService', () => {
  it('it should be able to authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    const response = await authenticateUserService.execute({
      email: 'teste@teste.com',
      password: 'teste',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });
  it('it should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUserService.execute({
        email: 'teste@teste.com',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('it should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    await expect(
      authenticateUserService.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
