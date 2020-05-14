import FakeAppointmentRepository from '@modules/appointment/repository/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to list the month availability from providers', async () => {
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 11, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 12, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 13, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 17, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });
    fakeAppointmentRepository.create({
      date: new Date(2020, 4, 21, 10, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
