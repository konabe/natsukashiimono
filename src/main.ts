import * as express from 'express';
import * as cors from 'cors';
import contentController from './controller/contentController';
import scoreController from './controller/scoreController';

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/content', contentController);
app.use('/score', scoreController);
app.get('/', (_: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World!' });
});

const port = 3000;
app.listen(port, () => console.log(`ok, port = ${port}`));
