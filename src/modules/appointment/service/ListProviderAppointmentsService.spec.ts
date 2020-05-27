import FakeAppointmentRepository from '@modules/appointment/repository/fakes/FakeAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: ICacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments of a provider for a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: 'provider',
      user_id: '123123',
    });

    const appointment2 = await fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: 'provider',
      user_id: '123123',
    });

    const appointments = await listProviderAppointmentsService.execute({
      providerId: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
