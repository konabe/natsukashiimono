import { Role } from '../../../../domain/role';
import { User } from '../../../../domain/user';
import { GetUserRequest, GetUserResponse } from './getUserAPI';
import { PatchUserRequest, PatchUserResponse } from './patchUserAPI';

describe('PatchUserRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      age                        | result
      ${10}                      | ${true}
      ${Number.MAX_SAFE_INTEGER} | ${true}
      ${0}                       | ${true}
      ${0.5}                     | ${false}
      ${-1}                      | ${false}
      ${undefined}               | ${false}
    `('should judge that $age is valid ($result)', ({ age, result }) => {
      expect(PatchUserRequest.instantiateBy({ age }) !== undefined).toBe(
        result,
      );
    });
  });
});

describe('PatchUserResponse', () => {
  it('#should create response', () => {
    expect(
      new PatchUserResponse(
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
