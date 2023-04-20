import { Response } from 'express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  PatchUserRequest,
  PatchUserResponse,
} from '../../../infrastructure/api/model/user/patchUserAPI';
import { ControllerAdaptor, ValidatedOptions } from '../../controllerAdaptor';

export type PatchUserControllerDependencies = {
  userRepository: IUserRepository;
};

export class PatchUserController extends ControllerAdaptor<PatchUserRequest> {
  allowed = ['user', 'admin'];
  constructor({ userRepository }: PatchUserControllerDependencies) {
    super(userRepository);
  }

  createRequest(obj: any): PatchUserRequest {
    return PatchUserRequest.instantiateBy(obj);
  }

  async validated(
    req: PatchUserRequest,
    res: Response,
    options: ValidatedOptions,
  ): Promise<void> {
    const user = await this.userRepository.updateAge(
      options.authorizedUser?.id,
      req.age,
    );
    if (user === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PatchUserResponse(user));
    return;
  }
}
