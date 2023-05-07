import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import {
  PutContentRequest,
  PutContentResponse,
} from '../../../infrastructure/api/model/content/putContentAPI';
import {
  ControllerAdaptor,
  StatusCode,
  ValidatedOptions,
} from '../../controllerAdaptor';
import { Content } from '../../../domain/content';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export class PutContentController extends ControllerAdaptor<
  PutContentRequest,
  PutContentResponse
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

  createRequest(req: any): PutContentRequest | undefined {
    return PutContentRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PutContentRequest,
    options?: ValidatedOptions | undefined,
  ): Promise<void> {
    const pathId = this.tryExtractNumberIdFromPath(options?.pathId);
    if (pathId === undefined) {
      this.returnWithError(StatusCode.BadRequest);
      return;
    }
    // FIXME: PutContentRequestがContentを生成する責務を持ったほうがいい
    const content = Content.instantiate({
      id: pathId,
      name: reqModel.name,
      description: reqModel.description,
      imageUrl: reqModel.imageUrl,
      votes: [],
    });
    if (content === undefined) {
      this.returnWithError(StatusCode.BadRequest);
      return;
    }
    const savedContent = await this.contentRepository.update(pathId, {
      name: content.name,
      description: content.description,
      imageUrl: content.imageUrl,
    });
    this.returnWithSuccess(PutContentResponse.instantiateBy(savedContent));
  }
}
