import * as express from 'express';
import { AuthorizedUser } from './middleware/authorizer';

export abstract class BaseRequest {}

export type ValidatedOptions = {
  authorizedUser: AuthorizedUser | undefined;
};

export abstract class ControllerAdaptor<TReq extends BaseRequest> {
  abstract createRequest(req: any): TReq | undefined;
  abstract validated(
    reqModel: TReq,
    res: express.Response,
    options?: ValidatedOptions,
  ): Promise<void>;

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
    const localsUser = res.locals.user;
    const authorizedUser: AuthorizedUser =
      localsUser !== undefined
        ? {
            ...localsUser,
          }
        : undefined;
    return await this.validated(reqModel, res, {
      authorizedUser,
    });
  }
}
