import { Content } from 'src/domain/content';
import { ContentResponseModel } from '../models';

export class GetContentResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    this.contents = contents
      .map((content) => ContentResponseModel.instantiateBy(content))
      .filter((c) => c !== undefined);
  }
}
