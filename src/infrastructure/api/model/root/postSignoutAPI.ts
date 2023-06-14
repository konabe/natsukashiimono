import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostSignoutRequest extends BaseRequest {
  _postSignoutRequest!: never;
  private constructor() {
    super();
  }

  static instantiateBy(_: any): PostSignoutRequest | undefined {
    return new PostSignoutRequest();
  }
}

export class PostSignoutResponse extends BaseResponse {
  _postSignoutResponse!: never;
  private constructor(readonly successed: boolean) {
    super();
  }

  static instantiateBy(successed: boolean): PostSignoutResponse {
    return new PostSignoutResponse(successed);
  }
}
