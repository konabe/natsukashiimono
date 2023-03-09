import * as express from 'express';
import { getDataSource } from '../../infrastructure/database/dataSource';
import { ScoreEntity } from '../../infrastructure/database/score.entity';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const scoreRepository = dataSource.getRepository(ScoreEntity);
  const { contentId, userId } = req.body;
  if (contentId === undefined || userId === undefined) {
    res.status(400).json();
    return;
  }
  const score = new ScoreEntity();
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

export default router;
