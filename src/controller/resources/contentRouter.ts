import * as express from 'express';
import { getDataSource } from '../../infrastructure/database/dataSource';
import { GetContentController } from './content/getContentController';
import { ContentFactory } from '../../infrastructure/database/contentFactory';
import { GetContentResponse } from '../../infrastructure/api/getContentAPI';
import { PostContentController } from './content/postContentController';
import { ContentRepository } from '../../infrastructure/database/contentRepository';

const router = express.Router();

router.get(
  '/',
  async (req: express.Request, res: express.Response<GetContentResponse[]>) => {
    const dataSource = await getDataSource();
    const contentsFactory = new ContentFactory(dataSource);
    new GetContentController({
      contentsFactory,
    }).invoke(req, res);
  },
);

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = new ContentRepository(dataSource);
  const contentFactory = new ContentFactory(dataSource);
  new PostContentController({
    contentRepository,
    contentFactory,
  }).invoke(req, res);
});

export default router;
