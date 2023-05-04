import { DataSource } from 'typeorm';
import { Content } from '../../domain/content';
import { IContentRepository } from '../../domain/repository/contentRepositoryInterface';
import { ContentEntity } from '../database/entity/content.entity';
import { ScoreEntity } from '../database/entity/score.entity';
import { Vote } from '../../domain/vote';
import { ApprovalStatus } from '../../domain/approvalStatus';

export class ContentRepository implements IContentRepository {
  constructor(private readonly dataSource: DataSource) {}

  async find(): Promise<Content[]> {
    return await this.findByFilter(() => true);
  }

  async findInprogress(): Promise<Content[]> {
    return await this.findByFilter(
      (c) => c.approvalStatus === ApprovalStatus.INPROGRESS,
    );
  }

  async findApproved(): Promise<Content[]> {
    return await this.findByFilter(
      (c) => c.approvalStatus === ApprovalStatus.APPROVED,
    );
  }

  private async findByFilter(
    filter: (ContentEntity: ContentEntity) => boolean,
  ): Promise<Content[]> {
    const contentRepository = this.dataSource.getRepository(ContentEntity);
    const scoreRepository = this.dataSource.getRepository(ScoreEntity);
    const scores = await scoreRepository.find();
    const resultScores = scores.map((s) => new Vote(s.contentId, s.userId));
    const results = await contentRepository.find();

    return results.filter(filter).flatMap((c) => {
      return (
        Content.instantiate({
          id: c.id,
          name: c.name,
          description: c.description,
          imageUrl: c.imageUrl,
          votes: resultScores,
        }) ?? []
      );
    });
  }

  async findOne(id: number): Promise<Content | undefined> {
    const contents = await this.find();
    const content = contents.find((c) => c.id === id);
    return content;
  }

  async save(receivedContent: Content): Promise<number> {
    const contentRepository = this.dataSource.getRepository(ContentEntity);
    const content = new ContentEntity();
    if (receivedContent.id !== undefined) {
      content.id = receivedContent.id;
    }
    content.name = receivedContent.name;
    content.description = receivedContent.description;
    content.imageUrl = receivedContent.imageUrl;
    content.approvalStatus = ApprovalStatus.INPROGRESS;
    const savedContent = await contentRepository.save(content);
    return savedContent.id;
  }

  async updateApprovalStatus(
    id: number,
    status: ApprovalStatus,
  ): Promise<number | undefined> {
    const contentRepository = this.dataSource.getRepository(ContentEntity);
    const content = await contentRepository.findOne({ where: { id } });
    if (content === null) {
      return undefined;
    }
    content.approvalStatus = status;
    const updated = await contentRepository.save(content);
    return updated.id;
  }
}
