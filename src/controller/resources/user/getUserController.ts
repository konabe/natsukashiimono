import { Response } from 'express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  GetUserRequest,
  GetUserResponse,
} from '../../../infrastructure/api/model/user/getUserAPI';
import { ControllerAdaptor, ValidatedOptions } from '../../controllerAdaptor';

export type GetUserControllerDependencies = {
  userRepository: IUserRepository;
};

export class GetUserController extends ControllerAdaptor<GetUserRequest> {
  allowed = ['user', 'admin'];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: GetUserControllerDependencies) {
    super(userRepository);
  }

  createRequest(_: any): GetUserRequest {
    return new GetUserRequest();
  }

  async validated(
    _: GetUserRequest,
    res: Response<any, Record<string, any>>,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    if (userId === undefined) {
      res.status(404).send();
      return;
    }
    const user = await this.userRepository.findUserById(userId);
    if (user === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new GetUserResponse(user));
    return;
  }
}
