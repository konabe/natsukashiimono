import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { ScoreEntity } from './entity/score.entity';
import { ContentEntity } from './entity/content.entity';

let dataSource: DataSource;
export async function getDataSource() {
  if (dataSource == null) {
    const _dataSource = new DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
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
