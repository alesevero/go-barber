import { container } from 'tsyringe';

import IHashProvider from '@modules/user/providers/hashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/user/providers/hashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
