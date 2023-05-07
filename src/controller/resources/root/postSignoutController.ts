import {
  PostSignoutRequest,
  PostSignoutResponse,
} from '../../../infrastructure/api/model/root/postSignoutAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  ControllerAdaptor,
  StatusCode,
  ValidatedOptions,
} from '../../controllerAdaptor';

export class PostSignoutController extends ControllerAdaptor<
  PostSignoutRequest,
  PostSignoutResponse
> {
  protected readonly allowed = ['admin', 'user'];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
  }

  createRequest(req: any): PostSignoutRequest | undefined {
    return PostSignoutRequest.instantiateBy(req);
  }

  async validated(
    _: PostSignoutRequest,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    // FIXME: userIdが必ずundefinedでないことを保証するControllerAdaptorを作成する
    if (userId === undefined) {
      this.returnWithError(StatusCode.Forbidden);
      return;
    }
    const successed = await this.userRepository.signout(userId);
    this.returnWithSuccess(PostSignoutResponse.instantiateBy(successed));
  }
}
