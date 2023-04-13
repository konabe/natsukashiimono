import * as express from 'express';
import {
  GetContentRequest,
  GetContentResponse,
} from '../../../infrastructure/api/model/content/getContentAPI';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type GetContentControllerDependencies = {
  contentRepository: IContentRepository;
};

export class GetContentController extends ControllerAdaptor<GetContentRequest> {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: GetContentControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(_: any): GetContentRequest {
    return new GetContentRequest();
  }

  async validated(
    _: GetContentRequest,
    res: express.Response<GetContentResponse>,
  ): Promise<void> {
    const resultContents = await this.contentRepository.findApproved();
    res.status(200).json(new GetContentResponse(resultContents));
    return;
  }
}
