import * as express from 'express';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';
import { UserRepositoryMock } from '../../database/repository/userRepository.mock';

const router = express.Router();
const authorizer = new UserAuthorizer({
  allowed: ['admin'],
  userRepository: new UserRepositoryMock(),
});

router.get(
  '/',
  authorizer.authenticate.bind(authorizer),
  (_: express.Request, res: express.Response) => {
    res.status(200).send();
  },
);

export default router;
