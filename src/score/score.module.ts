import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ScoreService } from './score.service';
import { scoreProviders } from './score.providers';

@Module({
  controllers: [ScoreController],
  imports: [DatabaseModule],
  providers: [ScoreService, ...scoreProviders],
  exports: [ScoreService, ...scoreProviders],
})
export class ScoreModule {}
