import * as express from 'express';
import {
  PostSignoutRequest,
  PostSignoutResponse,
} from '../../../infrastructure/api/model/root/postSignoutAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type PostSignoutControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSignoutController {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostSignoutControllerDependencies) {
    this.userRepository = userRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostSignoutRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const successed = await this.userRepository.signout(res.locals.user.id);
    res.status(200).json(PostSignoutResponse.instantiateBy(successed));
  }
}
