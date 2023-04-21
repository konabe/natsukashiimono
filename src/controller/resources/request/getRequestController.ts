import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import {
  GetRequestRequest,
  GetRequestResponse,
} from '../../../infrastructure/api/model/request/getRequestAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type GetRequestControllerDependencies = {
  userRepository: IUserRepository;
  contentRepository: IContentRepository;
};

export class GetRequestController extends ControllerAdaptor<GetRequestRequest> {
  allowed = ['admin'];
  private readonly contentRepository: IContentRepository;

  constructor({
    userRepository,
    contentRepository,
  }: GetRequestControllerDependencies) {
    super(userRepository);
    this.contentRepository = contentRepository;
  }

  createRequest(_: any) {
    return new GetRequestRequest();
  }

  async validated(_: GetRequestRequest, res: express.Response): Promise<void> {
    const resultContents = await this.contentRepository.findInprogress();
    res.status(200).json(new GetRequestResponse(resultContents));
    return;
  }
}
