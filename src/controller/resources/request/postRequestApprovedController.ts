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

export class PostRequestApprovedController extends BaseController {
  private readonly contentRepository: IContentRepository;
  constructor({
    contentRepository,
  }: PostRequestApprovedControllerDependencies) {
    super();
    this.contentRepository = contentRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostRequestApprovedRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const id = await this.contentRepository.updateApprovalStatus(
      request.contentId,
      ApprovalStatus.APPROVED,
    );
    if (id === undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).json(new PostRequestApprovalResponse());
  }
}
