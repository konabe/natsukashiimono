import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';
import { Content } from '../../../../domain/content';
import { ContentResponseModel } from '../models';

export class GetRequestRequest extends BaseRequest {}

export class GetRequestResponse extends BaseResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    super();
    this.contents = contents.flatMap(
      (content) => ContentResponseModel.instantiateBy(content) ?? [],
    );
  }
}
