import * as express from 'express';
import * as cors from 'cors';
import contentRouter from './controller/resources/contentRouter';
import scoreRouter from './controller/resources/scoreRouter';

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/content', contentRouter);
app.use('/score', scoreRouter);
app.get('/', (_: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World!' });
});

const port = 3000;
app.listen(port, () => console.log(`ok, port = ${port}`));
