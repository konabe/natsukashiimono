import { DataSource } from 'typeorm';
import { IScoreRepository } from '../../domain/repository/scoreRepositoryInterface';
import { Vote } from '../../domain/vote';
import { ScoreEntity } from '../database/entity/score.entity';

export class ScoreRepository implements IScoreRepository {
  constructor(private readonly dataSource: DataSource) {}

  async find(byContentId: number): Promise<Vote[]> {
    const scoreRepository = this.dataSource.getRepository(ScoreEntity);
    const scoreEntities = await scoreRepository.find({
      where: {
        contentId: byContentId,
      },
    });
    return scoreEntities.map((e) => new Vote(e.contentId, e.userId));
  }

  async save(vote: Vote): Promise<void> {
    const scoreRepository = this.dataSource.getRepository(ScoreEntity);
    const score = new ScoreEntity();
    score.contentId = vote.contentId;
    score.userId = vote.userId;
    await scoreRepository.save(score);
  }
}
