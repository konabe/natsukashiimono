import * as express from 'express';
import { IUserRepository } from '../domain/repository/userRepositoryInterface';

export abstract class BaseRequest {}

export abstract class BaseResponse {}

export enum StatusCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export type AuthorizedUser = {
  id: string;
  role: string;
};

export type ValidatedOptions = {
  authorizedUser?: AuthorizedUser;
  pathId?: string;
};

export abstract class ControllerAdaptor<
  TReq extends BaseRequest,
  TRes extends BaseResponse,
> {
  protected readonly allowed: string[] = [];
  private expRes: express.Response | undefined;

  constructor(protected readonly userRepository?: IUserRepository) {}

  abstract createRequest(req: any): TReq | undefined;
  abstract validated(reqModel: TReq, options?: ValidatedOptions): Promise<void>;

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
    this.expRes = res;
    let authorizedUser: AuthorizedUser | undefined;
    if (this.allowed.length !== 0) {
      authorizedUser = await this.authorize(req);
      if (authorizedUser === undefined) {
        this.returnWithError(StatusCode.Forbidden);
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
      this.returnWithError(StatusCode.BadRequest);
      return;
    }
    let pathId = req.params.id;
    return await this.validated(reqModel, {
      authorizedUser,
      pathId,
    });
  }

  // TODO: 最終的にはIDオブジェクトを生成させる流れがよさそう
  protected tryExtractNumberIdFromPath(
    pathIdRaw: string | undefined,
  ): number | undefined {
    if (pathIdRaw === undefined) {
      return undefined;
    }
    const pathId = Number(pathIdRaw);
    if (Number.isNaN(pathId)) {
      return undefined;
    }
    return pathId;
  }

  protected returnWithSuccess(response: TRes | undefined) {
    if (response === undefined) {
      this.expRes?.status(StatusCode.InternalServerError).json();
      return;
    }
    this.expRes?.status(StatusCode.OK).json(response);
  }

  protected returnWithError(code: StatusCode) {
    this.expRes?.status(code).send();
  }
}
