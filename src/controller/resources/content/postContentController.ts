import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { Content } from '../../../domain/content';
import { GetContentResponse } from '../../../infrastructure/api/model/getContentAPI';

export type PostContentControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostContentController {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: PostContentControllerDependencies) {
    this.contentRepository = contentRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const { name, description, imageUrl } = req.body;
    if (
      name === undefined ||
      description === undefined ||
      imageUrl === undefined
    ) {
      res.status(400).json();
      return;
    }

    const content = Content.instantiate({
      name,
      description,
      imageUrl,
      votes: [],
    });
    const savedContentId = await this.contentRepository.save(content);
    const savedContent = await this.contentRepository.findOne(savedContentId);
    res.status(200).json(GetContentResponse.instantiateBy(savedContent));
    return;
  }
}
