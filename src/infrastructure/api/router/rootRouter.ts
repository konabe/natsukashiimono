import * as express from 'express';

const router = express.Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

router.post(
  '/signin',
  async (req: express.Request, res: express.Response) => {},
);

router.post(
  '/signout',
  async (req: express.Request, res: express.Response) => {},
);

export default router;
