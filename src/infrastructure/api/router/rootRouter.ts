import * as express from 'express';
import { PostSigninController } from '../../../controller/resources/root/postSigninController';
import { authUser } from '../../middleware/auth.middleware';
import { UserRepositoryMock } from '../../database/repository/userRepository.mock';

const router = express.Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

router.post('/signin', async (req: express.Request, res: express.Response) => {
  const userRepository = new UserRepositoryMock();
  new PostSigninController({ userRepository }).invoke(req, res);
});

router.post(
  '/signout',
  authUser,
  async (req: express.Request, res: express.Response) => {
    res.status(200).send();
  },
);

export default router;
