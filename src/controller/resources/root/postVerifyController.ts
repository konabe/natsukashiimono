import {
  PostVerifyRequest,
  PostVerifyResponse,
} from '../../../infrastructure/api/model/root/postVerifyAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export class PostVerifyController extends ControllerAdaptor<
  PostVerifyRequest,
  PostVerifyResponse
> {
  protected readonly allowed = [];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  createRequest(req: any): PostVerifyRequest | undefined {
    return PostVerifyRequest.instantiateBy(req);
  }

  async validated(reqModel: PostVerifyRequest): Promise<void> {
    const { email, code } = reqModel;
    const verified = await this.userRepository.verify(email, code);
    this.returnWithSuccess(PostVerifyResponse.instantiateBy(verified));
  }
}
