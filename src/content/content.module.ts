import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ContentService } from './content.service';
import { contentProviders } from './content.providers';
import { ScoreModule } from 'src/score/score.module';

@Module({
  controllers: [ContentController],
  imports: [DatabaseModule, ScoreModule],
  providers: [ContentService, ...contentProviders],
  exports: [ContentService],
})
export class ContentModule {}
