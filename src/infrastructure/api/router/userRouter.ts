import * as express from 'express';
import { UserRepository } from '../../repository/userRepository';
import { GetUserController } from '../../../controller/resources/user/getUserController';
import { getDataSource } from '../../database/dataSource';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const dataSource = await getDataSource();
  const userRepository = new UserRepository(dataSource);
  new GetUserController({ userRepository }).invoke(req, res);
});

export default router;
