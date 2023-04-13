import * as express from 'express';
import {
  PostSigninRequest,
  PostSigninResponse,
} from '../../../infrastructure/api/model/root/postSigninAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { BaseController } from '../../baseController';

export type PostSigninControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSigninController extends BaseController<PostSigninRequest> {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostSigninControllerDependencies) {
    super();
    this.userRepository = userRepository;
  }

  createRequest(req: express.Request): PostSigninRequest | undefined {
    return PostSigninRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostSigninRequest,
    res: express.Response<any, Record<string, any>>,
  ): Promise<void> {
    const { email, password } = reqModel;
    const token = await this.userRepository.findToken(email, password);
    if (token === undefined) {
      res.status(401).send();
      return;
    }
    res.status(200).json(PostSigninResponse.instantiateBy(token));
  }
}
