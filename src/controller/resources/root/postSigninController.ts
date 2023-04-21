import * as express from 'express';
import {
  PostSigninRequest,
  PostSigninResponse,
} from '../../../infrastructure/api/model/root/postSigninAPI';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { ControllerAdaptor } from '../../controllerAdaptor';

export type PostSigninControllerDependencies = {
  userRepository: IUserRepository;
};

export class PostSigninController extends ControllerAdaptor<PostSigninRequest> {
  allowed = [];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: PostSigninControllerDependencies) {
    super(userRepository);
  }

  createRequest(req: any): PostSigninRequest | undefined {
    return PostSigninRequest.instantiateBy(req);
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
