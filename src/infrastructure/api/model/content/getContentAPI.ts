import { Content } from 'src/domain/content';
import { ContentResponseModel } from '../models';
import { BaseRequest } from '../../../../controller/controllerAdaptor';

export class GetContentRequest extends BaseRequest {}

export class GetContentResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    this.contents = contents.flatMap(
      (content) => ContentResponseModel.instantiateBy(content) ?? [],
    );
  }
}
