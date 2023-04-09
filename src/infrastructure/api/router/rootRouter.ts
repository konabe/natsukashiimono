import * as express from 'express';
import { PostSigninController } from '../../../controller/resources/root/postSigninController';
import { PostSignupController } from '../../../controller/resources/root/postSignupController';
import { PostVerifyController } from '../../../controller/resources/root/postVerifyController';
import { PostResendController } from '../../../controller/resources/root/postResendController';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';
import { UserRepository } from '../../repository/userRepository';

const router = express.Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

router.post('/signup', async (req: express.Request, res: express.Response) => {
  const userRepository = new UserRepository();
  new PostSignupController({ userRepository }).invoke(req, res);
});

router.post('/signin', async (req: express.Request, res: express.Response) => {
  const userRepository = new UserRepository();
  new PostSigninController({ userRepository }).invoke(req, res);
});

router.post('/verify', async (req: express.Request, res: express.Response) => {
  const userRepository = new UserRepository();
  new PostVerifyController({ userRepository }).invoke(req, res);
});

router.post('/resend', async (req: express.Request, res: express.Response) => {
  const userRepository = new UserRepository();
  new PostResendController({ userRepository }).invoke(req, res);
});

const authorizer = new UserAuthorizer({
  allowed: ['user', 'admin'],
  userRepository: new UserRepository(),
});

router.post(
  '/signout',
  authorizer.authenticate.bind(authorizer),
  async (req: express.Request, res: express.Response) => {
    res.status(200).send();
  },
);

export default router;
