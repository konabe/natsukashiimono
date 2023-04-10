import * as express from 'express';
import {
  PostVerifyRequest,
  PostVerifyResponse,
} from '../../../infrastructure/api/model/root/postVerifyAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type PostVerifyControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostVerifyController {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostVerifyControllerDependencies) {
    this.userRepository = userRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostVerifyRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const { email, code } = request;
    const verified = await this.userRepository.verify(email, code);
    res.status(200).json(PostVerifyResponse.instantiateBy(verified));
  }
}
