import { DataSource } from 'typeorm';
import { IContentFactory } from '../../domain/contentFactoryInterface';
import { Content } from '../../domain/content';
import { ContentEntity } from './content.entity';
import { ScoreEntity } from './score.entity';
import { Vote } from '../../domain/vote';

export class ContentFactory implements IContentFactory {
  constructor(private readonly dataSource: DataSource) {}

  async create(): Promise<Content[]> {
    const contentRepository = this.dataSource.getRepository(ContentEntity);
    const scoreRepository = this.dataSource.getRepository(ScoreEntity);
    const scores = await scoreRepository.find();
    const resultScores = scores.map((s) => new Vote(s.contentId, s.userId));
    const results = await contentRepository.find();

    return results
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
  }

  async createOne(id: number): Promise<Content> {
    const contents = await this.create();
    const content = contents.find((c) => c.id === id);
    return content;
  }
}
