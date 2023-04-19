import * as express from 'express';
import {
  PostSignupRequest,
  PostSignupResponse,
} from '../../../infrastructure/api/model/root/postSignupAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type PostSignupControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSignupController extends ControllerAdaptor<PostSignupRequest> {
  allowed = [];

  constructor({ userRepository }: PostSignupControllerDependencies) {
    super(userRepository);
  }

  createRequest(req: any): PostSignupRequest | undefined {
    return PostSignupRequest.instantiateBy(req);
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
