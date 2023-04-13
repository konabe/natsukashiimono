import { Role } from './role';
import { User } from './user';

describe('User', () => {
  describe('#instantiateBy', () => {
    it('should create normal case', () => {
      const user = User.instantiateBy('user-id-1', [
        new Role('1', 1),
        new Role('10', 10),
      ]);
      expect(user.roles.map((v) => v.name)).toEqual(['1', '10']);
    });

    it('should create invert case', () => {
      const user = User.instantiateBy('user-id-1', [
        new Role('10', 10),
        new Role('1', 1),
      ]);
      expect(user.roles.map((v) => v.name)).toEqual(['1', '10']);
    });
  });

  describe('#getRoleNames', () => {
    it('should get correctly', () => {
      const user = User.instantiateBy('user-id-1', [
        new Role('low', 10),
        new Role('high', 1),
      ]);
      expect(user.getRoleNames()).toEqual(['high', 'low']);
    });
  });
});
