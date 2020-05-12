import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import AppError from '@shared/error/AppError';
import FakeHashProvider from '@modules/user/providers/hashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from '../repository/fakes/FakeUserTokenRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    jest.clearAllMocks();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
    });

    const userToken = await fakeUserTokenRepository.generate(user.id);
    await resetPasswordService.execute({
      token: userToken.token,
      password: '123123',
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toBeCalledWith('123123');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
    });

    expect(
      resetPasswordService.execute({
        token: '123412341243',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password with non-existing token', async () => {
    const userToken = await fakeUserTokenRepository.generate(
      'non-existing-user',
    );

    expect(
      resetPasswordService.execute({
        token: userToken.id,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
    });

    const userToken = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token: userToken.id,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
