import * as express from 'express';
import { Score } from '../../../infrastructure/database/score.entity';
import { ContentEntity } from '../../../infrastructure/database/content.entity';
import { Repository } from 'typeorm';
import { Content } from '../../../domain/content';
import { Vote } from '../../../domain/vote';
import { ContentResponse } from 'src/infrastructure/api/contentResponse';

export type GetContentControllerDependencies = {
  contentRepository: Repository<ContentEntity>;
  scoreRepository: Repository<Score>;
};

export class GetContentController {
  private readonly contentRepository: Repository<ContentEntity>;
  private readonly scoreRepository: Repository<Score>;

  constructor({
    contentRepository,
    scoreRepository,
  }: GetContentControllerDependencies) {
    this.contentRepository = contentRepository;
    this.scoreRepository = scoreRepository;
  }

  async invoke(_: express.Request, res: express.Response) {
    const contents = await this.contentRepository.find();
    const scores = await this.scoreRepository.find();
    const resultScores = scores.map((s) => new Vote(s.contentId, s.userId));
    const resultContents = contents
      .map((c) => {
        return Content.instantiate({
          id: c.id,
          name: c.name,
          description: c.description,
          imageUrl: c.imageUrl,
          votes: resultScores,
        });
      })
      .filter((e) => e != null);
    const response: ContentResponse[] = resultContents.map((c) => {
      return {
        id: c.id,
        name: c.name,
        description: c.description,
        imageUrl: c.imageUrl,
        score: c.calculateScore(),
      };
    });
    res.status(200).json(response);
  }
}
