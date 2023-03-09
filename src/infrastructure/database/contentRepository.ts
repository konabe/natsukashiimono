import { DataSource } from 'typeorm';
import { Content } from '../../domain/content';
import { IContentRepository } from '../../domain/contentRepositoryInterface';
import { ContentEntity } from './content.entity';

export class ContentRepository implements IContentRepository {
  constructor(private readonly dataSource: DataSource) {}

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
