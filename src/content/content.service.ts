import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { Score } from 'src/score/score.entity';
import { ContentResponse } from './content.response';

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

  async save(content: Content) {
    this.contentRepository.save(content);
  }
}
