import * as express from 'express';
import { IScoreRepository } from '../../../domain/repository/scoreRepositoryInterface';
import { Vote } from '../../../domain/vote';
import {
  PostScoreRequest,
  PostScoreResponse,
} from '../../../infrastructure/api/model/score/postScoreAPI';
import { ControllerAdaptor, ValidatedOptions } from '../../controllerAdaptor';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type PostScoreControllerDependencies = {
  userRepository: IUserRepository;
  scoreRepository: IScoreRepository;
};

export class PostScoreController extends ControllerAdaptor<PostScoreRequest> {
  allowed = ['user', 'admin'];
  private readonly scoreRepository: IScoreRepository;

  constructor({
    userRepository,
    scoreRepository,
  }: PostScoreControllerDependencies) {
    super(userRepository);
    this.scoreRepository = scoreRepository;
  }

  createRequest(req: any): PostScoreRequest | undefined {
    return PostScoreRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PostScoreRequest,
    res: express.Response,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    if (userId === undefined) {
      res.status(404).send();
      return;
    }
    await this.scoreRepository.save(new Vote(reqModel.contentId, userId));
    const scoreEntities = await this.scoreRepository.find(reqModel.contentId);
    const response = PostScoreResponse.instantiateBy(scoreEntities);
    if (response === undefined) {
      res.status(500).send();
      return;
    }
    res.status(200).json(response);
    return;
  }
}
