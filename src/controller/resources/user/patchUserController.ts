import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  PatchUserRequest,
  PatchUserResponse,
} from '../../../infrastructure/api/model/user/patchUserAPI';
import {
  ControllerAdaptor,
  StatusCode,
  ValidatedOptions,
} from '../../controllerAdaptor';

export class PatchUserController extends ControllerAdaptor<
  PatchUserRequest,
  PatchUserResponse
> {
  protected readonly allowed = ['user', 'admin'];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  createRequest(obj: any): PatchUserRequest | undefined {
    return PatchUserRequest.instantiateBy(obj);
  }

  async validated(
    req: PatchUserRequest,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    // FIXME: userIdが必ずundefinedでないことを保証するControllerAdaptorを作成する
    if (userId === undefined) {
      this.returnWithError(StatusCode.Forbidden);
      return;
    }
    const user = await this.userRepository.updateAge(userId, req.age);
    if (user === undefined) {
      this.returnWithError(StatusCode.NotFound);
      return;
    }
    this.returnWithSuccess(new PatchUserResponse(user));
    return;
  }
}
