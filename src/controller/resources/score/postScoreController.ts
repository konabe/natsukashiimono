import * as express from 'express';
import { IScoreRepository } from '../../../domain/repository/scoreRepositoryInterface';
import { Vote } from '../../../domain/vote';
import {
  PostScoreRequest,
  PostScoreResponse,
} from '../../../infrastructure/api/model/postScoreAPI';

export type PostScoreControllerDependencies = {
  scoreRepository: IScoreRepository;
};

export class PostScoreController {
  private readonly scoreRepository: IScoreRepository;

  constructor({ scoreRepository }: PostScoreControllerDependencies) {
    this.scoreRepository = scoreRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostScoreRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    await this.scoreRepository.save(
      new Vote(request.contentId, request.userId),
    );
    const scoreEntities = await this.scoreRepository.find(request.contentId);
    const response = PostScoreResponse.instantiateBy(scoreEntities);
    if (response === undefined) {
      res.status(500).send();
      return;
    }
    res.status(200).json(response);
    return;
  }
}
