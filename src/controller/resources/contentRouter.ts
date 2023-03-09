import * as express from 'express';
import { getDataSource } from '../../infrastructure/database/dataSource';
import { Score } from '../../infrastructure/database/score.entity';
import { ContentEntity } from '../../infrastructure/database/content.entity';
import { GetContentController } from './content/getContentController';
import { ContentFactory } from '../../infrastructure/database/contentFactory';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentsFactory = new ContentFactory(dataSource);
  new GetContentController({
    contentsFactory,
  }).invoke(req, res);
});

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = dataSource.getRepository(ContentEntity);
  const scoreRepository = dataSource.getRepository(Score);
  const { name, description, imageUrl } = req.body;
  if (
    name === undefined ||
    description === undefined ||
    imageUrl === undefined
  ) {
    res.status(200).json();
    return;
  }
  const content = new ContentEntity();
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

export default router;
