import * as express from 'express';
import * as cors from 'cors';
import { DataSource } from 'typeorm';
import { Content } from './infrastructure/database/content.entity';
import { Score } from './infrastructure/database/score.entity';

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
const port = 3000;
app.get('/', (_: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World!' });
});
app.get('/content', async (_: express.Request, res: express.Response) => {
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
  const newDataSource = await dataSource.initialize();
  const contentRepository = newDataSource.getRepository(Content);
  const scoreRepository = newDataSource.getRepository(Score);
  const contents = await contentRepository.find();
  const scores = await scoreRepository.find();
  const resultContents = contents.map((content) => {
    const contentId = content.id;
    const contentScore = scores.filter((s) => s.contentId === contentId).length;
    return { ...content, score: contentScore };
  });
  res.status(200).json(resultContents);
});

app.post('/content', async (req: express.Request, res: express.Response) => {
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
  const newDataSource = await dataSource.initialize();
  const contentRepository = newDataSource.getRepository(Content);
  const scoreRepository = newDataSource.getRepository(Score);
  const { name, description, imageUrl } = req.body;
  if (
    name === undefined ||
    description === undefined ||
    imageUrl === undefined
  ) {
    res.status(200).json();
    return;
  }
  const content = new Content();
  content.name = name;
  content.description = description;
  content.imageUrl = imageUrl;
  const savedContent = await contentRepository.save(content);

  const newContent = await contentRepository.findOne({
    where: {
      id: savedContent.id,
    },
  });
  const scores = await scoreRepository.find({
    where: {
      contentId: savedContent.id,
    },
  });
  const resultContent = {
    ...newContent,
    score: scores.length,
  };
  return res.status(200).json(resultContent);
});

app.post('/score', async (req: express.Request, res: express.Response) => {
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
  const newDataSource = await dataSource.initialize();
  const scoreRepository = newDataSource.getRepository(Score);
  const { contentId, userId } = req.body;
  if (contentId === undefined || userId === undefined) {
    res.status(400).json();
    return;
  }
  const score = new Score();
  score.contentId = contentId;
  score.userId = userId;
  await scoreRepository.save(score);
  const scoreEntities = await scoreRepository.find({
    where: {
      contentId,
    },
  });
  res.status(200).json({
    contentId,
    total: scoreEntities.length,
  });
});

app.listen(port, () => console.log(`ok, port = ${port}`));
