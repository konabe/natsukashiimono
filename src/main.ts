import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

// express移行後

const app: express.Express = express();
app.use(cors());
const port = 9000;
app.get('/', (_: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World!' });
});
app.listen(port, () => console.log(`ok, port = ${port}`));
