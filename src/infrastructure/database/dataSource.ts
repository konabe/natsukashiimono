import { DataSource } from 'typeorm';
import { ScoreEntity } from './score.entity';
import { ContentEntity } from './content.entity';

let dataSource: DataSource;
export async function getDataSource() {
  if (dataSource == null) {
    const _dataSource = new DataSource({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'natsukashiimono',
      // FIXME: Windows10だとパスで指定する方法が通らないというバグがある。型の列挙で暫定対応
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [ContentEntity, ScoreEntity],
      synchronize: true, // 本番ではfalseにするべき
    });
    dataSource = await _dataSource.initialize();
  }
  return dataSource;
}
