import * as express from 'express';
import * as cors from 'cors';
import contentRouter from './infrastructure/api/router/contentRouter';
import scoreRouter from './infrastructure/api/router/scoreRouter';
import rootRouter from './infrastructure/api/router/rootRouter';

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

const port = 3000;
app.listen(port, () => console.log(`ok, port = ${port}`));
