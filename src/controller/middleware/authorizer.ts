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

  async authenticate(
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
    const userEmail = await this.userRepository.findUserByToken(token);
    const role = await this.userRepository.findRole(userEmail);
    if (this.allowed.includes(role)) {
      next();
      return;
    }
    res.status(403).send();
  }
}
