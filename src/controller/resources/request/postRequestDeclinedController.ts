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

export class PostRequestDeclinedController extends BaseController<PostRequestDeclinedRequest> {
  private readonly contentRepository: IContentRepository;
  constructor({
    contentRepository,
  }: PostRequestDeclinedControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(req: express.Request): PostRequestDeclinedRequest | undefined {
    return PostRequestDeclinedRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostRequestDeclinedRequest,
    res: express.Response,
  ): Promise<void> {
    const id = await this.contentRepository.updateApprovalStatus(
      reqModel.contentId,
      ApprovalStatus.DECLINED,
    );
    if (id === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PostRequestDeclinedResponse());
  }
}
