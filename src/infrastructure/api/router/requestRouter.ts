import * as express from 'express';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';
import { UserRepositoryMock } from '../../database/repository/userRepository.mock';
import { getDataSource } from '../../database/dataSource';
import { ContentRepository } from '../../database/repository/contentRepository';
import { GetRequestController } from '../../../controller/resources/request/getRequestController';
import { PostRequestApprovedController } from '../../../controller/resources/request/postRequestApprovedController';
import { PostRequestDeclinedController } from '../../../controller/resources/request/postRequestDeclinedController';

const router = express.Router();
const authorizer = new UserAuthorizer({
  allowed: ['admin'],
  userRepository: new UserRepositoryMock(),
});

router.get(
  '/',
  authorizer.authenticate.bind(authorizer),
  async (req: express.Request, res: express.Response) => {
    const dataSource = await getDataSource();
    const contentRepository = new ContentRepository(dataSource);
    new GetRequestController({ contentRepository }).invoke(req, res);
  },
);

router.post(
  '/approved',
  authorizer.authenticate.bind(authorizer),
  async (req: express.Request, res: express.Response) => {
    const dataSource = await getDataSource();
    const contentRepository = new ContentRepository(dataSource);
    new PostRequestApprovedController({ contentRepository }).invoke(req, res);
  },
);

router.post(
  '/declined',
  authorizer.authenticate.bind(authorizer),
  async (req: express.Request, res: express.Response) => {
    const dataSource = await getDataSource();
    const contentRepository = new ContentRepository(dataSource);
    new PostRequestDeclinedController({ contentRepository }).invoke(req, res);
  },
);

export default router;
