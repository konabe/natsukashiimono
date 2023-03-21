import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { Content } from '../../../domain/content';
import {
  PostContentRequest,
  PostContentResponse,
} from '../../../infrastructure/api/model/content/postContentAPI';

export type PostContentControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostContentController {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: PostContentControllerDependencies) {
    this.contentRepository = contentRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostContentRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }

    const content = Content.instantiate({
      name: request.name,
      description: request.description,
      imageUrl: request.imageUrl,
      votes: [],
    });
    const savedContentId = await this.contentRepository.save(content);
    const savedContent = await this.contentRepository.findOne(savedContentId);
    res.status(200).json(PostContentResponse.instantiateBy(savedContent));
    return;
  }
}
