import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { Content } from '../../../domain/content';
import {
  PostContentRequest,
  PostContentResponse,
} from '../../../infrastructure/api/model/content/postContentAPI';
import { ControllerAdaptor, StatusCode } from '../../controllerAdaptor';

export class PostContentController extends ControllerAdaptor<
  PostContentRequest,
  PostContentResponse
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

  createRequest(req: any): PostContentRequest | undefined {
    return PostContentRequest.instantiateBy(req);
  }

  async validated(reqModel: PostContentRequest): Promise<void> {
    // FIXME: PostContentRequestがContentを生成する責務を持ったほうがいい
    const content = Content.instantiate({
      name: reqModel.name,
      description: reqModel.description,
      imageUrl: reqModel.imageUrl,
      votes: [],
    });
    if (content === undefined) {
      // Contentエンティティの作成に失敗した要因がリクエストによるもの
      this.returnWithError(StatusCode.BadRequest);
      return;
    }
    const savedContentId = await this.contentRepository.create(content);
    const savedContent = await this.contentRepository.findOne(savedContentId);
    this.returnWithSuccess(PostContentResponse.instantiateBy(savedContent));
    return;
  }
}
