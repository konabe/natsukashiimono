import * as express from 'express';
import { getDataSource } from '../../database/dataSource';
import { PostScoreController } from '../../../controller/resources/score/postScoreController';
import { ScoreRepository } from '../../repository/scoreRepository';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';
import { UserRepository } from '../../repository/userRepository';

const router = express.Router();

const authorizer = new UserAuthorizer({
  allowed: ['user', 'admin'],
  userRepository: new UserRepository(),
});

router.post(
  '/',
  authorizer.authenticate.bind(authorizer),
  async (req: express.Request, res: express.Response) => {
    const dataSource = await getDataSource();
    const scoreRepository = new ScoreRepository(dataSource);
    new PostScoreController({ scoreRepository }).invoke(req, res);
  },
);

export default router;
