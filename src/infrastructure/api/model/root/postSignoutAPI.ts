import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostSignoutRequest extends BaseRequest {
  private constructor() {
    super();
  }

  static instantiateBy(_: any): PostSignoutRequest | undefined {
    return new PostSignoutRequest();
  }
}

export class PostSignoutResponse extends BaseResponse {
  private constructor(readonly successed: boolean) {
    super();
  }

  static instantiateBy(successed: boolean): PostSignoutResponse {
    return new PostSignoutResponse(successed);
  }
}
