import * as express from 'express';
import { getDataSource } from '../../database/dataSource';
import { PostScoreController } from '../../../controller/resources/score/postScoreController';
import { ScoreRepository } from '../../database/repository/scoreRepository';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const scoreRepository = new ScoreRepository(dataSource);
  new PostScoreController({ scoreRepository }).invoke(req, res);
});

export default router;
