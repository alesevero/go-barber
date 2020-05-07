import FakeAppointmentRepository from '@modules/appointment/repository/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '@modules/appointment/service/CreateAppointmentService';
import AppError from '@shared/error/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointmentDate = new Date(2020, 4, 6);
    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: '123456',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
