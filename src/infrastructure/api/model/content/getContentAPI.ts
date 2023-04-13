import { Content } from 'src/domain/content';
import { ContentResponseModel } from '../models';
import { BaseRequest } from '../../../../controller/baseController';

export class GetContentRequest extends BaseRequest {}

export class GetContentResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    this.contents = contents
      .map((content) => ContentResponseModel.instantiateBy(content))
      .filter((c) => c !== undefined);
  }
}
