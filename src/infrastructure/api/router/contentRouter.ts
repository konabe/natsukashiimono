import * as express from 'express';
import { getDataSource } from '../../database/dataSource';
import { GetContentController } from '../../../controller/resources/content/getContentController';
import { PostContentController } from '../../../controller/resources/content/postContentController';
import { PutContentController } from '../../../controller/resources/content/putContentController';
import { ContentRepository } from '../../repository/contentRepository';
import { UserRepository } from '../../repository/userRepository';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = new ContentRepository(dataSource);
  new GetContentController({
    contentRepository,
  }).invoke(req, res);
});

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = new ContentRepository(dataSource);
  new PostContentController({
    contentRepository,
  }).invoke(req, res);
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = new ContentRepository(dataSource);
  const userRepository = new UserRepository(dataSource);
  new PutContentController({
    userRepository,
    contentRepository,
  }).invoke(req, res);
});

export default router;
