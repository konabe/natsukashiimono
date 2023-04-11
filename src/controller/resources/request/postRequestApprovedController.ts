import * as express from 'express';
import { BaseController } from '../../baseController';
import {
  PostRequestApprovalResponse,
  PostRequestApprovedRequest,
} from '../../../infrastructure/api/model/request/postRequestApprovedAPI';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { ApprovalStatus } from '../../../domain/approvalStatus';

export type PostRequestApprovedControllerDependencies = {
  contentRepository: IContentRepository;
};

export class PostRequestApprovedController extends BaseController<PostRequestApprovedRequest> {
  private readonly contentRepository: IContentRepository;
  constructor({
    contentRepository,
  }: PostRequestApprovedControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  createRequest(req: express.Request): PostRequestApprovedRequest | undefined {
    return PostRequestApprovedRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostRequestApprovedRequest,
    res: express.Response,
  ): Promise<void> {
    const id = await this.contentRepository.updateApprovalStatus(
      reqModel.contentId,
      ApprovalStatus.APPROVED,
    );
    if (id === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PostRequestApprovalResponse());
  }
}
