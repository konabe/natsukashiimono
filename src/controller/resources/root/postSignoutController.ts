import * as express from 'express';
import {
  PostSignoutRequest,
  PostSignoutResponse,
} from '../../../infrastructure/api/model/root/postSignoutAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { BaseController } from '../../baseController';

export type PostSignoutControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSignoutController extends BaseController<PostSignoutRequest> {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostSignoutControllerDependencies) {
    super();
    this.userRepository = userRepository;
  }

  createRequest(req: express.Request): PostSignoutRequest | undefined {
    return PostSignoutRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostSignoutRequest,
    res: express.Response,
  ): Promise<void> {
    const successed = await this.userRepository.signout(res.locals.user.id);
    res.status(200).json(PostSignoutResponse.instantiateBy(successed));
  }
}
