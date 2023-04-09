import * as express from 'express';
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
    const sent = await this.userRepository.resendCode(email);
    res.status(200).json(PostResendResponse.instantiateBy(sent));
  }
}
