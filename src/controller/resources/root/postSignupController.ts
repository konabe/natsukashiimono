import * as express from 'express';
import {
  PostSignupRequest,
  PostSignupResponse,
} from '../../../infrastructure/api/model/root/postSignupAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { BaseController } from '../../baseController';

export type PostSignupControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSignupController extends BaseController<PostSignupRequest> {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostSignupControllerDependencies) {
    super();
    this.userRepository = userRepository;
  }

  createRequest(req: express.Request): PostSignupRequest | undefined {
    return PostSignupRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostSignupRequest,
    res: express.Response,
  ): Promise<void> {
    const { email, password } = reqModel;
    const successed = await this.userRepository.create(email, password);
    res.status(200).json(PostSignupResponse.instantiateBy(successed));
  }
}
