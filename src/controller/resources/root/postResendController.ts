import * as express from 'express';
import {
  PostVerifyRequest,
  PostVerifyResponse,
} from '../../../infrastructure/api/model/root/postVerifyAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  PostResendRequest,
  PostResendResponse,
} from '../../../infrastructure/api/model/root/postResendAPI';

export type PostResendControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostResendController {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostResendControllerDependencies) {
    this.userRepository = userRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostResendRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const { email } = request;
    const token = await this.userRepository.resendCode(email);
    if (token === undefined) {
      res.status(401).send();
      return;
    }
    res.status(200).json(PostResendResponse.instantiateBy());
  }
}
