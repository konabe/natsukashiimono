import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { ContentService } from '../../service/content.service';
import { contentProviders } from '../../infrastructure/database/content/content.providers';
import { ScoreModule } from '../score/score.module';

@Module({
  controllers: [ContentController],
  imports: [DatabaseModule, ScoreModule],
  providers: [ContentService, ...contentProviders],
  exports: [ContentService],
})
export class ContentModule {}
