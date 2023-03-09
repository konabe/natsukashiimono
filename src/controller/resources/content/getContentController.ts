import * as express from 'express';
import { ContentResponse } from '../../../infrastructure/api/contentResponse';
import { IContentFactory } from '../../../infrastructure/database/contentFactory';

export type GetContentControllerDependencies = {
  contentsFactory: IContentFactory;
};

export class GetContentController {
  private readonly contentsFactory: IContentFactory;

  constructor({ contentsFactory }: GetContentControllerDependencies) {
    this.contentsFactory = contentsFactory;
  }

  async invoke(_: express.Request, res: express.Response) {
    const resultContents = await this.contentsFactory.create();
    const response: ContentResponse[] = resultContents.map((content) =>
      ContentResponse.instantiateBy(content),
    );
    res.status(200).json(response);
  }
}
