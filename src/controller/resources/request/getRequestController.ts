import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { GetRequestResponse } from '../../../infrastructure/api/model/request/getRequestAPI';

export type GetRequestControllerDependencies = {
  contentRepository: IContentRepository;
};

export class GetRequestController {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: GetRequestControllerDependencies) {
    this.contentRepository = contentRepository;
  }

  async invoke(
    _: express.Request,
    res: express.Response<GetRequestResponse>,
  ): Promise<void> {
    const resultContents = await this.contentRepository.findInprogress();
    res.status(200).json(new GetRequestResponse(resultContents));
    return;
  }
}
