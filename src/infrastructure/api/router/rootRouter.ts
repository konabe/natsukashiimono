import * as express from 'express';
import { StubPostSigninController } from '../../../controller/resources/root/postSigninController';
import { authUser } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

router.post('/signin', async (req: express.Request, res: express.Response) => {
  new StubPostSigninController().invoke(req, res);
});

router.post(
  '/signout',
  authUser,
  async (req: express.Request, res: express.Response) => {
    res.status(200).send();
  },
);

export default router;
