import { Content } from '../../../../domain/content';
import { ContentResponseModel } from '../models';

export class GetRequestResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    this.contents = contents
      .map((content) => ContentResponseModel.instantiateBy(content))
      .filter((c) => c !== undefined);
  }
}
