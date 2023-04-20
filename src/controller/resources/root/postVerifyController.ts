import * as express from 'express';
import {
  PostVerifyRequest,
  PostVerifyResponse,
} from '../../../infrastructure/api/model/root/postVerifyAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type PostVerifyControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostVerifyController extends ControllerAdaptor<PostVerifyRequest> {
  allowed = [];
  constructor({ userRepository }: PostVerifyControllerDependencies) {
    super(userRepository);
  }

  createRequest(req: any): PostVerifyRequest | undefined {
    return PostVerifyRequest.instantiateBy(req);
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
