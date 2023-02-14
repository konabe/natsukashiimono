import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ContentController } from './content/content.controller';
import { ContentModule } from './content/content.module';
import { ScoreController } from './score/score.controller';
import { ScoreModule } from './score/score.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [DatabaseModule, ContentModule, ScoreModule],
  controllers: [AppController, ContentController, ScoreController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
