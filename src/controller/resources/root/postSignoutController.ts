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
    const _ = PostSignoutRequest.instantiateBy(req.body);
    const successed = await this.userRepository.signout(res.locals.user.id);
    res.status(200).json(PostSignoutResponse.instantiateBy(successed));
  }
}
