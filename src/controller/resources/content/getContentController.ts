import * as express from 'express';
import { GetContentResponse } from '../../../infrastructure/api/getContentAPI';
import { IContentFactory } from '../../../domain/contentFactoryInterface';

export type GetContentControllerDependencies = {
  contentsFactory: IContentFactory;
};

export class GetContentController {
  private readonly contentsFactory: IContentFactory;

  constructor({ contentsFactory }: GetContentControllerDependencies) {
    this.contentsFactory = contentsFactory;
  }

  async invoke(
    _: express.Request,
    res: express.Response<GetContentResponse[]>,
  ): Promise<void> {
    const resultContents = await this.contentsFactory.create();
    const response: GetContentResponse[] = resultContents.map((content) =>
      GetContentResponse.instantiateBy(content),
    );
    res.status(200).json(response);
    return;
  }
}
