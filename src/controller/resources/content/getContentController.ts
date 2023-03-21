import * as express from 'express';
import { GetContentResponse } from '../../../infrastructure/api/model/content/getContentAPI';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';

export type GetContentControllerDependencies = {
  contentRepository: IContentRepository;
};

export class GetContentController {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: GetContentControllerDependencies) {
    this.contentRepository = contentRepository;
  }

  async invoke(
    _: express.Request,
    res: express.Response<GetContentResponse[]>,
  ): Promise<void> {
    const resultContents = await this.contentRepository.find();
    const response = resultContents.map(
      (content) => GetContentResponse.instantiateBy(content),
      // TODO: instantiateByがundefinedのときを考慮していない。
    );
    res.status(200).json(response);
    return;
  }
}
