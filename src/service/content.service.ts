import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Content } from '../infrastructure/database/content/content.entity';
import { Score } from 'src/infrastructure/database/score/score.entity';
import { ContentResponse } from '../infrastructure/api/content.response';

@Injectable()
export class ContentService {
  constructor(
    @Inject('CONTENT_REPOSITORY')
    private contentRepository: Repository<Content>,
    @Inject('SCORE_REPOSITORY') private scoreRepository: Repository<Score>,
  ) {}

  async findAll(): Promise<ContentResponse[]> {
    const contents = await this.contentRepository.find();
    const scores = await this.scoreRepository.find();
    const resultContents = contents.map((content) => {
      const contentId = content.id;
      const contentScore = scores.filter(
        (s) => s.contentId === contentId,
      ).length;
      return { ...content, score: contentScore };
    });
    return resultContents;
  }

  async findOne(contentId: number): Promise<ContentResponse> {
    const content = await this.contentRepository.findOne({
      where: {
        id: contentId,
      },
    });
    const scores = await this.scoreRepository.find({
      where: {
        contentId,
      },
    });
    const resultContent = {
      ...content,
      score: scores.length,
    };
    return resultContent;
  }

  async save(content: Content): Promise<Content> {
    return await this.contentRepository.save(content);
  }
}
