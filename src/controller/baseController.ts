import * as express from 'express';

export abstract class BaseController {
  abstract invoke(req: express.Request, res: express.Response): Promise<void>;
}
