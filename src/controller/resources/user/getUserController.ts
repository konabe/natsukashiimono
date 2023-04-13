import { Response } from 'express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  GetUserRequest,
  GetUserResponse,
} from '../../../infrastructure/api/model/user/getUserAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type GetUserControllerDependencies = {
  userRepository: IUserRepository;
};

export class GetUserController extends ControllerAdaptor<GetUserRequest> {
  private readonly userRepository: IUserRepository;

  constructor({ userRepository }: GetUserControllerDependencies) {
    super();
    this.userRepository = userRepository;
  }

  createRequest(_: any): GetUserRequest {
    return new GetUserRequest();
  }

  async validated(
    _: GetUserRequest,
    res: Response<any, Record<string, any>>,
  ): Promise<void> {
    const id = res.locals.user.id;
    const user = await this.userRepository.findUserById(id);
    if (user === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new GetUserResponse(user));
    return;
  }
}
