import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from '../infrastructure/database/score/score.entity';

type TotalScore = {
  contentId: number;
  total: number;
};

@Injectable()
export class ScoreService {
  constructor(
    @Inject('SCORE_REPOSITORY') private scoreRepository: Repository<Score>,
  ) {}

  async save(contentId: number, userId: number): Promise<TotalScore> {
    const score = new Score();
    score.contentId = contentId;
    score.userId = userId;
    this.scoreRepository.save(score);
    const scoreEntities = await this.scoreRepository.find({
      where: {
        contentId,
      },
    });
    return {
      contentId,
      total: scoreEntities.length,
    };
  }
}
