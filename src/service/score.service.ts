import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from '../infrastructure/database/score/score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @Inject('SCORE_REPOSITORY') private scoreRepository: Repository<Score>,
  ) {}

  save(contentId: number, userId: number) {
    const score = new Score();
    score.contentId = contentId;
    score.userId = userId;
    this.scoreRepository.save(score);
  }
}
