import { Content } from 'src/domain/content';
import { ContentResponseModel } from '../models';
import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class GetContentRequest extends BaseRequest {
  _getContentRequesT!: never;
}

export class GetContentResponse extends BaseResponse {
  _getContentResponse!: never;
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    super();
    this.contents = contents.flatMap(
      (content) => ContentResponseModel.instantiateBy(content) ?? [],
    );
  }
}
