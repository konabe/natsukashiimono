import * as express from 'express';
import { getDataSource } from '../../database/dataSource';
import { ContentRepository } from '../../repository/contentRepository';
import { GetRequestController } from '../../../controller/resources/request/getRequestController';
import { PostRequestApprovedController } from '../../../controller/resources/request/postRequestApprovedController';
import { PostRequestDeclinedController } from '../../../controller/resources/request/postRequestDeclinedController';
import { UserRepository } from '../../repository/userRepository';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = new ContentRepository(dataSource);
  const userRepository = new UserRepository(dataSource);
  new GetRequestController({ userRepository, contentRepository }).invoke(
    req,
    res,
  );
});

router.post(
  '/approved',
  async (req: express.Request, res: express.Response) => {
    const dataSource = await getDataSource();
    const contentRepository = new ContentRepository(dataSource);
    const userRepository = new UserRepository(dataSource);
    new PostRequestApprovedController({
      userRepository,
      contentRepository,
    }).invoke(req, res);
  },
);

router.post(
  '/declined',
  async (req: express.Request, res: express.Response) => {
    const dataSource = await getDataSource();
    const contentRepository = new ContentRepository(dataSource);
    const userRepository = new UserRepository(dataSource);
    new PostRequestDeclinedController({
      userRepository,
      contentRepository,
    }).invoke(req, res);
  },
);

export default router;
