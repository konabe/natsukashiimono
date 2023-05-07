import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  PostResendRequest,
  PostResendResponse,
} from '../../../infrastructure/api/model/root/postResendAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';

export class PostResendController extends ControllerAdaptor<
  PostResendRequest,
  PostResendResponse
> {
  protected readonly allowed = [];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
  }

  createRequest(req: any): PostResendRequest | undefined {
    return PostResendRequest.instantiateBy(req);
  }

  async validated(reqModel: PostResendRequest): Promise<void> {
    const { email } = reqModel;
    const sent = await this.userRepository.resendCode(email);
    this.returnWithSuccess(PostResendResponse.instantiateBy(sent));
  }
}
