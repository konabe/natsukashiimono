import { Role } from '../src/domain/role';
import { User } from '../src/domain/user';

export const adminUser = User.instantiateBy('id001', [
  new Role('admin', 50),
  new Role('user', 100),
]);

export const user20Years = User.instantiateBy(
  'id001',
  [new Role('admin', 50), new Role('user', 100)],
  { age: 20 },
);
