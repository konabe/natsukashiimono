import {
  PostSigninRequest,
  PostSigninResponse,
} from '../../../infrastructure/api/model/root/postSigninAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor, StatusCode } from '../../controllerAdaptor';

export class PostSigninController extends ControllerAdaptor<
  PostSigninRequest,
  PostSigninResponse
> {
  protected readonly allowed = [];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
  }

  createRequest(req: any): PostSigninRequest | undefined {
    return PostSigninRequest.instantiateBy(req);
  }

  async validated(reqModel: PostSigninRequest): Promise<void> {
    const { email, password } = reqModel;
    const token = await this.userRepository.findToken(email, password);
    if (token === undefined) {
      this.returnWithError(StatusCode.Unauthorized);
      return;
    }
    this.returnWithSuccess(PostSigninResponse.instantiateBy(token));
  }
}
