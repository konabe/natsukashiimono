import * as express from 'express';
import {
  PostSignoutRequest,
  PostSignoutResponse,
} from '../../../infrastructure/api/model/root/postSignoutAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor, ValidatedOptions } from '../../controllerAdaptor';

export type PostSignoutControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSignoutController extends ControllerAdaptor<PostSignoutRequest> {
  allowed = ['admin', 'user'];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: PostSignoutControllerDependencies) {
    super(userRepository);
  }

  createRequest(req: any): PostSignoutRequest | undefined {
    return PostSignoutRequest.instantiateBy(req);
  }

  async validated(
    _: PostSignoutRequest,
    res: express.Response,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    if (userId === undefined) {
      return;
    }
    const successed = await this.userRepository.signout(userId);
    res.status(200).json(PostSignoutResponse.instantiateBy(successed));
  }
}
