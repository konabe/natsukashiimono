import { IScoreRepository } from '../../../domain/repository/scoreRepositoryInterface';
import { Vote } from '../../../domain/vote';
import {
  PostScoreRequest,
  PostScoreResponse,
} from '../../../infrastructure/api/model/score/postScoreAPI';
import {
  ControllerAdaptor,
  StatusCode,
  ValidatedOptions,
} from '../../controllerAdaptor';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export class PostScoreController extends ControllerAdaptor<
  PostScoreRequest,
  PostScoreResponse
> {
  protected readonly allowed = ['user', 'admin'];
  private readonly scoreRepository: IScoreRepository;

  constructor({
    userRepository,
    scoreRepository,
  }: {
    userRepository: IUserRepository;
    scoreRepository: IScoreRepository;
  }) {
    super(userRepository);
    this.scoreRepository = scoreRepository;
  }

  createRequest(req: any): PostScoreRequest | undefined {
    return PostScoreRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PostScoreRequest,
    options: ValidatedOptions,
  ): Promise<void> {
    const userId = options.authorizedUser?.id;
    // FIXME: userIdが必ずundefinedでないことを保証するControllerAdaptorを作成する
    if (userId === undefined) {
      this.returnWithError(StatusCode.Forbidden);
      return;
    }
    await this.scoreRepository.save(new Vote(reqModel.contentId, userId));
    const scoreEntities = await this.scoreRepository.find(reqModel.contentId);
    const response = PostScoreResponse.instantiateBy(scoreEntities);
    if (response === undefined) {
      this.returnWithError(StatusCode.InternalServerError);
      return;
    }
    this.returnWithSuccess(response);
    return;
  }
}
