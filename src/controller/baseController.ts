import * as express from 'express';

export abstract class BaseRequest {}

export abstract class BaseController<TReq extends BaseRequest> {
  abstract createRequest(req: express.Request): TReq | undefined;
  abstract validated(reqModel: TReq, res: express.Response): Promise<void>;

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const reqModel = this.createRequest(req);
    if (reqModel === undefined) {
      res.status(400).send();
      return;
    }
    return await this.validated(reqModel, res);
  }
}
