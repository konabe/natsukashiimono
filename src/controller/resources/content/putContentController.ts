import * as express from 'express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import {
  PutContentRequest,
  PutContentResponse,
} from '../../../infrastructure/api/model/content/putContentAPI';
import { ControllerAdaptor, ValidatedOptions } from '../../controllerAdaptor';
import { Content } from '../../../domain/content';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export type PutContentControllerDependencies = {
  userRepository: IUserRepository;
  contentRepository: IContentRepository;
};

export class PutContentController extends ControllerAdaptor<PutContentRequest> {
  allowed = ['admin'];
  private readonly contentRepository: IContentRepository;

  constructor({
    userRepository,
    contentRepository,
  }: PutContentControllerDependencies) {
    super(userRepository);
    this.contentRepository = contentRepository;
  }

  createRequest(req: any): PutContentRequest | undefined {
    return PutContentRequest.instantiateBy(req);
  }

  async validated(
    reqModel: PutContentRequest,
    res: express.Response,
    options?: ValidatedOptions | undefined,
  ): Promise<void> {
    const pathIdRaw = options?.pathId;
    if (pathIdRaw === undefined) {
      res.status(400);
      return;
    }
    const pathId = Number(pathIdRaw);
    if (Number.isNaN(pathId)) {
      res.status(400);
      return;
    }
    console.log(pathId);
    const content = Content.instantiate({
      id: pathId,
      name: reqModel.name,
      description: reqModel.description,
      imageUrl: reqModel.imageUrl,
      votes: [],
    });
    if (content === undefined) {
      res.status(400);
      return;
    }
    const savedContentId = await this.contentRepository.save(content);
    const savedContent = await this.contentRepository.findOne(savedContentId);
    res.status(200).json(PutContentResponse.instantiateBy(savedContent));
  }
}
