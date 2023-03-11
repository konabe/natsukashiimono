import { DataSource } from 'typeorm';
import { Content } from '../../domain/content';
import { IContentRepository } from '../../domain/contentRepositoryInterface';
import { ContentEntity } from './content.entity';
import { ScoreEntity } from './score.entity';
import { Vote } from '../../domain/vote';

export class ContentRepository implements IContentRepository {
  constructor(private readonly dataSource: DataSource) {}

  async find(): Promise<Content[]> {
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

  async findOne(id: number): Promise<Content> {
    const contents = await this.find();
    const content = contents.find((c) => c.id === id);
    return content;
  }

  async save(receivedContent: Content): Promise<number> {
    const contentRepository = this.dataSource.getRepository(ContentEntity);
    const content = new ContentEntity();
    content.name = receivedContent.name;
    content.description = receivedContent.description;
    content.imageUrl = receivedContent.imageUrl;
    const savedContent = await contentRepository.save(content);
    return savedContent.id;
  }
}
