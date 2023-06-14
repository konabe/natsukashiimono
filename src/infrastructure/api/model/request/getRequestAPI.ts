import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';
import { Content } from '../../../../domain/content';
import { ContentResponseModel } from '../models';

export class GetRequestRequest extends BaseRequest {
  _getRequestRequest!: never;
}

export class GetRequestResponse extends BaseResponse {
  _getRequestResponse!: never;
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    super();
    this.contents = contents.flatMap(
      (content) => ContentResponseModel.instantiateBy(content) ?? [],
    );
  }
}
