import { Role } from '../../../../domain/role';
import { User } from '../../../../domain/user';
import { GetUserRequest, GetUserResponse } from './getUserAPI';

describe('GetUserRequest', () => {
  it('#should create request', () => {
    expect(new GetUserRequest()).toBeDefined();
  });
});

describe('GetUserResponse', () => {
  it('#should create response', () => {
    expect(
      new GetUserResponse(
        User.instantiateBy(
          'user-id-1',
          [new Role('admin', 50), new Role('user', 100)],
          { age: 10 },
        ),
      ),
    ).toEqual({
      id: 'user-id-1',
      roles: ['admin', 'user'],
      age: 10,
    });
  });
});
