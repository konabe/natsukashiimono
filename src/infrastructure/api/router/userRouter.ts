import * as express from 'express';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';
import { UserRepository } from '../../repository/userRepository';
import { GetUserController } from '../../../controller/resources/user/getUserController';

const router = express.Router();

const authorizer = new UserAuthorizer({
  allowed: ['user', 'admin'],
  userRepository: new UserRepository(),
});

router.get(
  '/',
  authorizer.authenticate.bind(authorizer),
  async (req: express.Request, res: express.Response) => {
    const userRepository = new UserRepository();
    new GetUserController({ userRepository }).invoke(req, res);
  },
);

export default router;
