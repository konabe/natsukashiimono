import * as express from 'express';
import { UserAuthorizer } from '../../../controller/middleware/authorizer';
import { UserRepositoryMock } from '../../database/repository/userRepository.mock';

const router = express.Router();

router.get(
  '/',
  new UserAuthorizer({
    allowed: [],
    userRepository: new UserRepositoryMock(),
  }).authenticateAdmin,
  (_: express.Request, res: express.Response) => {
    res.status(200).send();
  },
);

export default router;
