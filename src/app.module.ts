import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ContentController } from './controller/content/content.controller';
import { ContentModule } from './controller/content/content.module';
import { ScoreController } from './controller/score/score.controller';
import { ScoreModule } from './controller/score/score.module';

@Module({
  imports: [DatabaseModule, ContentModule, ScoreModule],
  controllers: [AppController, ContentController, ScoreController],
  providers: [AppService],
})
export class AppModule {}
