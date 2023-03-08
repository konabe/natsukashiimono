import * as express from 'express';
import { getDataSource } from '../infrastructure/database/dataSource';
import { Score } from '../infrastructure/database/score.entity';
import { Content } from '../infrastructure/database/content.entity';

const router = express.Router();

router.get('/', async (_: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = dataSource.getRepository(Content);
  const scoreRepository = dataSource.getRepository(Score);
  const contents = await contentRepository.find();
  const scores = await scoreRepository.find();
  const resultContents = contents.map((content) => {
    const contentId = content.id;
    const contentScore = scores.filter((s) => s.contentId === contentId).length;
    return { ...content, score: contentScore };
  });
  res.status(200).json(resultContents);
});

router.post('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const contentRepository = dataSource.getRepository(Content);
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
  const content = new Content();
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
