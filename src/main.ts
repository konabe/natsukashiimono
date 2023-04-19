import * as express from 'express';
import * as cors from 'cors';
import contentRouter from './infrastructure/api/router/contentRouter';
import scoreRouter from './infrastructure/api/router/scoreRouter';
import rootRouter from './infrastructure/api/router/rootRouter';
import requestRouter from './infrastructure/api/router/requestRouter';
import userRouter from './infrastructure/api/router/userRouter';
import { getDataSource } from './infrastructure/database/dataSource';

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/', rootRouter);
app.use('/content', contentRouter);
app.use('/score', scoreRouter);
app.use('/request', requestRouter);
app.use('/user', userRouter);

(async () => {
  try {
    await getDataSource();
  } catch (err) {
    console.log('*---------------------------------*');
    console.log(' Trial of DB connection is failed. ');
    console.log(' .env file may cause the error.    ');
    console.log('*---------------------------------*');
    console.error(err);
  }
})();

const port = 3000;
app.listen(port, () => console.log(`ok, port = ${port}`));
