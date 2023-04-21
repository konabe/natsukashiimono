import { BaseRequest } from '../../../../controller/controllerAdaptor';
import { Content } from '../../../../domain/content';
import { ContentResponseModel } from '../models';

export class GetRequestRequest extends BaseRequest {}

export class GetRequestResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    this.contents = contents.flatMap(
      (content) => ContentResponseModel.instantiateBy(content) ?? [],
    );
  }
}
