import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/error/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('CreateUserService', () => {
  it('should be able to update the avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    const userWithAvatar = await updateUserAvatarService.execute({
      userId: user.id,
      filename: 'teste.png',
    });

    expect(userWithAvatar).toHaveProperty('avatar');
    expect(userWithAvatar.avatar).toBe('teste.png');
  });
  it('should not be able to update the avatar of an user that does not exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatarService.execute({
        userId: '123',
        filename: 'teste.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old avatar when updating new one to update the avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const user = await fakeUserRepository.create({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      filename: 'teste.png',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      filename: 'teste2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('teste.png');
  });
});
