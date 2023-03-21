import * as express from 'express';

import { IUserRepository } from '../../domain/repository/userRepositoryInterface';

export type UserAuthorizerDependencies = {
  // TODO: それ用のドメインモデルを作成する
  allowed: string[];
  userRepository: IUserRepository;
};

export class UserAuthorizer {
  readonly allowed: string[];
  readonly userRepository: IUserRepository;

  constructor({ allowed, userRepository }: UserAuthorizerDependencies) {
    this.allowed = allowed;
    this.userRepository = userRepository;
  }

  authenticateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const authorizationHeaderValue = req.header('Authorization');
    if (authorizationHeaderValue === undefined) {
      res.status(403).send();
      return;
    }
    const token = authorizationHeaderValue.replace('Bearer ', '');
    if (token === 'ABCDEF1234567890' || token === '1234567890ABCDEF') {
      next();
      return;
    }
    if (token === 'ADMINADMINADMIN') {
      next();
      return;
    }
    res.status(403).send();
  }

  authenticateAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const authorizationHeaderValue = req.header('Authorization');
    if (authorizationHeaderValue === undefined) {
      res.status(403).send();
      return;
    }
    const token = authorizationHeaderValue.replace('Bearer ', '');
    if (token === 'ADMINADMINADMIN') {
      next();
      return;
    }
    res.status(403).send();
    return;
  }
}
