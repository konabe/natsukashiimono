import * as express from 'express';

export abstract class BaseRequest {}

export abstract class ControllerAdaptor<TReq extends BaseRequest> {
  abstract createRequest(req: any): TReq | undefined;
  abstract validated(reqModel: TReq, res: express.Response): Promise<void>;

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    let reqModel: TReq;
    if (['GET', 'DELETE'].includes(req.method)) {
      reqModel = this.createRequest(req.params);
    } else {
      reqModel = this.createRequest(req.body);
    }
    if (reqModel === undefined) {
      res.status(400).send();
      return;
    }
    return await this.validated(reqModel, res);
  }
}
