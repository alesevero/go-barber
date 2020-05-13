import { container } from 'tsyringe';
import '@modules/user/providers';
import '@shared/container/providers';

import IAppointmentRepository from '@modules/appointment/repository/IAppointmentRepository';
import AppointmentRepository from '@modules/appointment/infra/typeorm/repository/AppointmentsRepository';

import IUserRepository from '@modules/user/repository/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repository/UserRepository';

import IUserTokenRepository from '@modules/user/repository/IUserTokenRepository';
import UserTokenRepository from '@modules/user/infra/typeorm/repository/UserTokenRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
