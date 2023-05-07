import { ControllerAdaptor, StatusCode } from '../../controllerAdaptor';
import {
  PostRequestApprovalResponse,
  PostRequestApprovedRequest,
} from '../../../infrastructure/api/model/request/postRequestApprovedAPI';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ApprovalStatus } from '../../../domain/approvalStatus';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export class PostRequestApprovedController extends ControllerAdaptor<
  PostRequestApprovedRequest,
  PostRequestApprovalResponse
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

  createRequest(req: any): PostRequestApprovedRequest | undefined {
    return PostRequestApprovedRequest.instantiateBy(req);
  }

  async validated(reqModel: PostRequestApprovedRequest): Promise<void> {
    const id = await this.contentRepository.updateApprovalStatus(
      reqModel.contentId,
      ApprovalStatus.APPROVED,
    );
    if (id === undefined) {
      this.returnWithError(StatusCode.NotFound);
      return;
    }
    this.returnWithSuccess(new PostRequestApprovalResponse());
  }
}
