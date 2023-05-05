import * as express from 'express';
import { IUserRepository } from '../domain/repository/userRepositoryInterface';

export abstract class BaseRequest {}

export type AuthorizedUser = {
  id: string;
  role: string;
};

export type ValidatedOptions = {
  authorizedUser?: AuthorizedUser;
  pathId?: string;
};

export abstract class ControllerAdaptor<TReq extends BaseRequest> {
  readonly allowed: string[];

  constructor(protected readonly userRepository?: IUserRepository) {}

  abstract createRequest(req: any): TReq | undefined;
  abstract validated(
    reqModel: TReq,
    res: express.Response,
    options?: ValidatedOptions,
  ): Promise<void>;

  async authorize(req: express.Request): Promise<AuthorizedUser | undefined> {
    const authorizationHeaderValue = req.header('Authorization');
    if (authorizationHeaderValue === undefined) {
      return;
    }
    const token = authorizationHeaderValue.replace('Bearer ', '');
    const userId = await this.userRepository?.findUserIdByToken(token);
    if (userId === undefined) {
      return undefined;
    }
    const user = await this.userRepository?.findUserById(userId);
    if (user === undefined) {
      return;
    }
    const role = user.getRepresentativeRoleName();
    const authorizedUser: AuthorizedUser = {
      id: userId,
      role,
    };
    if (this.allowed.includes(role)) {
      return authorizedUser;
    }
    return;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    let authorizedUser: AuthorizedUser | undefined;
    if (this.allowed.length !== 0) {
      authorizedUser = await this.authorize(req);
      if (authorizedUser === undefined) {
        res.status(403).send();
        return;
      }
    }
    let reqModel: TReq | undefined;
    if (['GET', 'DELETE'].includes(req.method)) {
      reqModel = this.createRequest(req.params);
    } else {
      reqModel = this.createRequest(req.body);
    }
    if (reqModel === undefined) {
      res.status(400).send();
      return;
    }
    let pathId = req.params.id;
    return await this.validated(reqModel, res, {
      authorizedUser,
      pathId,
    });
  }
}
