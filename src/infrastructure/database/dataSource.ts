import { DataSource } from 'typeorm';
import { Score } from './score.entity';
import { Content } from './content.entity';

export async function getDataSource() {
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
  return await dataSource.initialize();
}
