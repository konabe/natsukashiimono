import * as express from 'express';
import { BaseController } from '../../baseController';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ApprovalStatus } from '../../../domain/approvalStatus';
import {
  PostRequestDeclinedRequest,
  PostRequestDeclinedResponse,
} from '../../../infrastructure/api/model/request/postRequestDeclinedAPI';

export type PostRequestDeclinedControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostRequestDeclinedController extends BaseController {
  private readonly contentRepository: IContentRepository;
  constructor({
    contentRepository,
  }: PostRequestDeclinedControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostRequestDeclinedRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const id = await this.contentRepository.updateApprovalStatus(
      request.contentId,
      ApprovalStatus.DECLINED,
    );
    if (id === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PostRequestDeclinedResponse());
  }
}
