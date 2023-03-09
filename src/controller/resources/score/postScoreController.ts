import * as express from 'express';
import { IScoreRepository } from '../../../domain/scoreRepositoryInterface';
import { Vote } from '../../../domain/vote';

export type PostScoreControllerDependencies = {
  scoreRepository: IScoreRepository;
};

export class PostScoreController {
  private readonly scoreRepository: IScoreRepository;

  constructor({ scoreRepository }: PostScoreControllerDependencies) {
    this.scoreRepository = scoreRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const { contentId, userId } = req.body;
    if (contentId === undefined || userId === undefined) {
      res.status(400).json();
      return;
    }
    await this.scoreRepository.save(new Vote(contentId, userId));
    const scoreEntities = await this.scoreRepository.find(contentId);
    res.status(200).json({
      contentId,
      total: scoreEntities.length,
    });
    return;
  }
}
