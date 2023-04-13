import * as express from 'express';
import { IScoreRepository } from '../../../domain/repository/scoreRepositoryInterface';
import { Vote } from '../../../domain/vote';
import {
  PostScoreRequest,
  PostScoreResponse,
} from '../../../infrastructure/api/model/score/postScoreAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type PostScoreControllerDependencies = {
  scoreRepository: IScoreRepository;
};

export class PostScoreController extends ControllerAdaptor<PostScoreRequest> {
  private readonly scoreRepository: IScoreRepository;

  constructor({ scoreRepository }: PostScoreControllerDependencies) {
    super();
    this.scoreRepository = scoreRepository;
  }

  createRequest(req: any): PostScoreRequest | undefined {
    return PostScoreRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PostScoreRequest,
    res: express.Response,
  ): Promise<void> {
    await this.scoreRepository.save(
      new Vote(reqModel.contentId, res.locals.user.id),
    );
    const scoreEntities = await this.scoreRepository.find(reqModel.contentId);
    const response = PostScoreResponse.instantiateBy(scoreEntities);
    if (response === undefined) {
      res.status(500).send();
      return;
    }
    res.status(200).json(response);
    return;
  }
}
