import * as express from 'express';
import { PostSigninController } from '../../../controller/resources/root/postSigninController';
import { PostSignupController } from '../../../controller/resources/root/postSignupController';
import { PostVerifyController } from '../../../controller/resources/root/postVerifyController';
import { PostResendController } from '../../../controller/resources/root/postResendController';
import { UserRepository } from '../../repository/userRepository';
import { PostSignoutController } from '../../../controller/resources/root/postSignoutController';
import { getDataSource } from '../../database/dataSource';

const router = express.Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

router.post('/signup', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  new PostSignupController({ userRepository }).invoke(req, res);
});

router.post('/signin', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  new PostSigninController({ userRepository }).invoke(req, res);
});

router.post('/verify', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  new PostVerifyController({ userRepository }).invoke(req, res);
});

router.post('/resend', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  new PostResendController({ userRepository }).invoke(req, res);
});

router.post('/signout', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  new PostSignoutController({ userRepository }).invoke(req, res);
});

export default router;
