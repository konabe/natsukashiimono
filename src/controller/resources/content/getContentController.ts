import {
  GetContentRequest,
  GetContentResponse,
} from '../../../infrastructure/api/model/content/getContentAPI';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export class GetContentController extends ControllerAdaptor<
  GetContentRequest,
  GetContentResponse
> {
  readonly allowed = [];
  private readonly contentRepository: IContentRepository;

  constructor({
    contentRepository,
  }: {
    contentRepository: IContentRepository;
  }) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(_: any): GetContentRequest {
    return new GetContentRequest();
  }

  async validated(_: GetContentRequest): Promise<void> {
    const resultContents = await this.contentRepository.findApproved();
    this.returnWithSuccess(new GetContentResponse(resultContents));
    return;
  }
}
