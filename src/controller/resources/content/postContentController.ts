import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { Content } from '../../../domain/content';
import {
  PostContentRequest,
  PostContentResponse,
} from '../../../infrastructure/api/model/content/postContentAPI';
import { BaseController } from '../../baseController';

export type PostContentControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostContentController extends BaseController<PostContentRequest> {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: PostContentControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(req: express.Request): PostContentRequest | undefined {
    return PostContentRequest.instantiateBy(req.body);
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
    const savedContentId = await this.contentRepository.save(content);
    const savedContent = await this.contentRepository.findOne(savedContentId);
    res.status(200).json(PostContentResponse.instantiateBy(savedContent));
    return;
  }
}
