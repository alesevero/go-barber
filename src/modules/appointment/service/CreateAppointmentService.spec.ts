import FakeAppointmentRepository from '@modules/appointment/repository/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '@modules/appointment/service/CreateAppointmentService';
import AppError from '@shared/error/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IAppointmentRepository from '../repository/IAppointmentRepository';

let fakeAppointmentRepository: IAppointmentRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: INotificationsRepository;
let fakeCacheProvider: ICacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      userId: '123123',
      providerId: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 13);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await createAppointmentService.execute({
      date: appointmentDate,
      userId: '123123',
      providerId: '123456',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        userId: '123123',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        userId: '123123',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        userId: '123123',
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create two appointments outside open hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 7),
        userId: '123123',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 18),
        userId: '123123',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
