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
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: PatchUserControllerDependencies) {
    super(userRepository);
  }

  createRequest(obj: any): PatchUserRequest | undefined {
    return PatchUserRequest.instantiateBy(obj);
  }

  async validated(
    req: PatchUserRequest,
    res: Response,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    if (userId === undefined) {
      return undefined;
    }
    const user = await this.userRepository.updateAge(userId, req.age);
    if (user === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PatchUserResponse(user));
    return;
  }
}
