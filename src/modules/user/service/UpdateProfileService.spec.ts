import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'New name',
      email: 'new@email.com',
    });

    expect(updatedUser.name).toBe('New name');
    expect(updatedUser.email).toBe('new@email.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste2@teste.com',
      password: 'teste',
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'New name',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'New name',
      email: 'new@email.com',
      password: '123123',
      oldPassword: 'teste',
    });

    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password wihtout old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'New name',
        email: 'new@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });
    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'New name',
        email: 'new@email.com',
        password: '123123',
        oldPassword: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
