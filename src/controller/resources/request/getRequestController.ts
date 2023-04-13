import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import {
  GetRequestRequest,
  GetRequestResponse,
} from '../../../infrastructure/api/model/request/getRequestAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type GetRequestControllerDependencies = {
  contentRepository: IContentRepository;
};

export class GetRequestController extends ControllerAdaptor<GetRequestRequest> {
  private readonly contentRepository: IContentRepository;

  constructor({ contentRepository }: GetRequestControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(req: express.Request) {
    return new GetRequestRequest();
  }

  async validated(
    reqModel: GetRequestRequest,
    res: express.Response,
  ): Promise<void> {
    const resultContents = await this.contentRepository.findInprogress();
    res.status(200).json(new GetRequestResponse(resultContents));
    return;
  }
}
