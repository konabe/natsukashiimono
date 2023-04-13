import * as express from 'express';
import {
  PostVerifyRequest,
  PostVerifyResponse,
} from '../../../infrastructure/api/model/root/postVerifyAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { BaseController } from '../../baseController';

export type PostVerifyControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostVerifyController extends BaseController<PostVerifyRequest> {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostVerifyControllerDependencies) {
    super();
    this.userRepository = userRepository;
  }

  createRequest(req: express.Request): PostVerifyRequest | undefined {
    return PostVerifyRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostVerifyRequest,
    res: express.Response<any, Record<string, any>>,
  ): Promise<void> {
    const { email, code } = reqModel;
    const verified = await this.userRepository.verify(email, code);
    res.status(200).json(PostVerifyResponse.instantiateBy(verified));
  }
}
