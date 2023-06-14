import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import {
  GetRequestRequest,
  GetRequestResponse,
} from '../../../infrastructure/api/model/request/getRequestAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export class GetRequestController extends ControllerAdaptor<
  GetRequestRequest,
  GetRequestResponse
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

  createRequest(_: any) {
    return new GetRequestRequest();
  }

  async validated(_: GetRequestRequest): Promise<void> {
    const resultContents = await this.contentRepository.findInprogress();
    this.returnWithSuccess(new GetRequestResponse(resultContents));
    return;
  }
}
