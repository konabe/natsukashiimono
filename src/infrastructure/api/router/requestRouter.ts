import * as express from 'express';
import { authAdmin } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', authAdmin, (_: express.Request, res: express.Response) => {
  res.status(200).send();
});

export default router;
