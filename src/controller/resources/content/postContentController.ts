import * as express from 'express';
import { IContentRepository } from '../../../domain/contentRepositoryInterface';
import { Content } from '../../../domain/content';
import { IContentFactory } from '../../../domain/contentFactoryInterface';
import { GetContentResponse } from '../../../infrastructure/api/getContentAPI';

export type PostContentControllerDependencies = {
  contentRepository: IContentRepository;
  contentFactory: IContentFactory;
};

export class PostContentController {
  private readonly contentRepository: IContentRepository;
  private readonly contentFactory: IContentFactory;

  constructor({
    contentRepository,
    contentFactory,
  }: PostContentControllerDependencies) {
    this.contentRepository = contentRepository;
    this.contentFactory = contentFactory;
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
    const savedContent = await this.contentFactory.createOne(savedContentId);
    res.status(200).json(GetContentResponse.instantiateBy(savedContent));
    return;
  }
}
