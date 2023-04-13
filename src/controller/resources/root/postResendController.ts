import * as express from 'express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  PostResendRequest,
  PostResendResponse,
} from '../../../infrastructure/api/model/root/postResendAPI';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type PostResendControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostResendController extends ControllerAdaptor<PostResendRequest> {
  private userRepository: IUserRepository;

  constructor({ userRepository }: PostResendControllerDependencies) {
    super();
    this.userRepository = userRepository;
  }

  createRequest(req: express.Request): PostResendRequest | undefined {
    return PostResendRequest.instantiateBy(req.body);
  }

  async validated(
    reqModel: PostResendRequest,
    res: express.Response,
  ): Promise<void> {
    const { email } = reqModel;
    const sent = await this.userRepository.resendCode(email);
    res.status(200).json(PostResendResponse.instantiateBy(sent));
  }
}
