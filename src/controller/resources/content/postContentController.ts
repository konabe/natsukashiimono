import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { Content } from '../../../domain/content';
import {
  PostContentRequest,
  PostContentResponse,
} from '../../../infrastructure/api/model/content/postContentAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type PostContentControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostContentController extends ControllerAdaptor<PostContentRequest> {
  readonly allowed = [];
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: PostContentControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(req: any): PostContentRequest | undefined {
    return PostContentRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PostContentRequest,
    res: express.Response,
  ): Promise<void> {
    const content = Content.instantiate({
      name: reqModel.name,
      description: reqModel.description,
      imageUrl: reqModel.imageUrl,
      votes: [],
    });
    if (content === undefined) {
      res.status(400);
      return;
    }
    const savedContentId = await this.contentRepository.create(content);
    const savedContent = await this.contentRepository.findOne(savedContentId);
    res.status(200).json(PostContentResponse.instantiateBy(savedContent));
    return;
  }
}
