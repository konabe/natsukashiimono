import { ControllerAdaptor, StatusCode } from '../../controllerAdaptor';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ApprovalStatus } from '../../../domain/approvalStatus';
import {
  PostRequestDeclinedRequest,
  PostRequestDeclinedResponse,
} from '../../../infrastructure/api/model/request/postRequestDeclinedAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export class PostRequestDeclinedController extends ControllerAdaptor<
  PostRequestDeclinedRequest,
  PostRequestDeclinedResponse
> {
  protected readonly allowed = ['admin'];
  private readonly contentRepository: IContentRepository;

  constructor({
    userRepository,
    contentRepository,
  }: {
    userRepository: IUserRepository;
    contentRepository: IContentRepository;
  }) {
    super(userRepository);
    this.contentRepository = contentRepository;
  }

  createRequest(req: any): PostRequestDeclinedRequest | undefined {
    return PostRequestDeclinedRequest.instantiateBy(req);
  }

  async validated(reqModel: PostRequestDeclinedRequest): Promise<void> {
    const id = await this.contentRepository.updateApprovalStatus(
      reqModel.contentId,
      ApprovalStatus.DECLINED,
    );
    if (id === undefined) {
      this.returnWithError(StatusCode.NotFound);
      return;
    }
    this.returnWithSuccess(new PostRequestDeclinedResponse());
  }
}
