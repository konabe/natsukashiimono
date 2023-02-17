import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { ScoreService } from '../../service/score.service';
import { scoreProviders } from '../../infrastructure/database/score/score.providers';

@Module({
  controllers: [ScoreController],
  imports: [DatabaseModule],
  providers: [ScoreService, ...scoreProviders],
  exports: [ScoreService, ...scoreProviders],
})
export class ScoreModule {}
