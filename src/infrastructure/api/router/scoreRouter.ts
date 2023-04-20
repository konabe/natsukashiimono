import * as express from 'express';
import { getDataSource } from '../../database/dataSource';
import { PostScoreController } from '../../../controller/resources/score/postScoreController';
import { ScoreRepository } from '../../repository/scoreRepository';
import { UserRepository } from '../../repository/userRepository';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  const scoreRepository = new ScoreRepository(dataSource);
  new PostScoreController({ userRepository, scoreRepository }).invoke(req, res);
});

export default router;
