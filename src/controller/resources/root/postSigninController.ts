import * as express from 'express';
import {
  PostSigninRequest,
  PostSigninResponse,
} from '../../../infrastructure/api/model/postSigninAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type PostSigninControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSigninController {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostSigninControllerDependencies) {
    this.userRepository = userRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostSigninRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const { email, password } = request;
    const token = this.userRepository.findToken(email, password);
    if (token === undefined) {
      res.status(401).send();
      return;
    }
    res.status(200).json(PostSigninResponse.instantiateBy(token));
  }
}
