import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/service/CreateUserService';
import AppError from '@shared/error/AppError';
import FakeHashProvider from '@modules/user/providers/hashProvider/fakes/FakeHashProvider';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Teste da Silva');
    expect(user.email).toBe('teste@teste.com');
  });
  it('should not be able to create a new user with an email that is already in use', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    expect(
      createUserService.execute({
        name: 'Teste da Silva',
        email: 'teste@teste.com',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
