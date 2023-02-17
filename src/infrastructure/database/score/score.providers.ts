import { DataSource } from 'typeorm';
import { Score } from '../score/score.entity';

export const scoreProviders = [
  {
    provide: 'SCORE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Score),
    inject: ['DATA_SOURCE'],
  },
];
