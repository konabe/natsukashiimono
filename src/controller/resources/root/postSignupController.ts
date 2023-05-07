import {
  PostSignupRequest,
  PostSignupResponse,
} from '../../../infrastructure/api/model/root/postSignupAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export class PostSignupController extends ControllerAdaptor<
  PostSignupRequest,
  PostSignupResponse
> {
  protected readonly allowed = [];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
  }

  createRequest(req: any): PostSignupRequest | undefined {
    return PostSignupRequest.instantiateBy(req);
  }

  async validated(reqModel: PostSignupRequest): Promise<void> {
    const { email, password } = reqModel;
    const successed = await this.userRepository.create(email, password);
    this.returnWithSuccess(PostSignupResponse.instantiateBy(successed));
  }
}
