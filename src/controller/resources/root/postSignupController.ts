import * as express from 'express';
import {
  PostSignupRequest,
  PostSignupResponse,
} from '../../../infrastructure/api/model/root/postSignupAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type PostSignupControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSignupController {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostSignupControllerDependencies) {
    this.userRepository = userRepository;
  }

  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const request = PostSignupRequest.instantiateBy(req.body);
    if (request === undefined) {
      res.status(400).send();
      return;
    }
    const { email, password } = request;
    const successed = await this.userRepository.create(email, password);
    res.status(200).json(PostSignupResponse.instantiateBy(successed));
  }
}
