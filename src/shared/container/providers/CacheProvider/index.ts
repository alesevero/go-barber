import { container } from 'tsyringe';
import ICacheProvider from './models/ICacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerInstance<ICacheProvider>(
  'CacheProvider',
  container.resolve(providers.redis),
);
