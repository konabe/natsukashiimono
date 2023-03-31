import * as express from 'express';
import { getDataSource } from '../../database/dataSource';
import { GetContentController } from '../../../controller/resources/content/getContentController';
import { GetContentResponse } from '../model/content/getContentAPI';
import { PostContentController } from '../../../controller/resources/content/postContentController';
import { ContentRepository } from '../../database/repository/contentRepository';

const router = express.Router();

router.get(
  '/',
  async (req: express.Request, res: express.Response<GetContentResponse>) => {
    const dataSource = await getDataSource();
    const contentRepository = new ContentRepository(dataSource);
    new GetContentController({
      contentRepository,
    }).invoke(req, res);
  },
);

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = new ContentRepository(dataSource);
  new PostContentController({
    contentRepository,
  }).invoke(req, res);
});

export default router;
