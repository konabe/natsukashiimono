import * as express from 'express';

import { IUserRepository } from '../../domain/repository/userRepositoryInterface';

export type AuthorizedUser = {
  id: string;
  role: string;
};

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
    const userId = await this.userRepository.findUserIdByToken(token);
    const user = await this.userRepository.findUserById(userId);
    if (user === undefined) {
      res.status(403).send();
      return;
    }
    const role = user.getRepresentativeRoleName();
    const authorizedUser: AuthorizedUser = {
      id: userId,
      role,
    };
    if (this.allowed.includes(role)) {
      res.locals.user = authorizedUser;
      next();
      return;
    }
    res.status(403).send();
  }
}
