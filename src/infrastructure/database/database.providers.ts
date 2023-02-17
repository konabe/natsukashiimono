import { Content } from 'src/infrastructure/database/content/content.entity';
import { Score } from 'src/infrastructure/database/score/score.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'natsukashiimono',
        // FIXME: Windows10だとパスで指定する方法が通らないというバグがある。型の列挙で暫定対応
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [Content, Score],
        synchronize: true, // 本番ではfalseにするべき
      });

      return dataSource.initialize();
    },
  },
];
