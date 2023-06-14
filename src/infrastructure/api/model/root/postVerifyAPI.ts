import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostVerifyRequest extends BaseRequest {
  _postVerifyRequest!: never;
  private constructor(readonly email: string, readonly code: string) {
    super();
  }

  static instantiateBy(object: any): PostVerifyRequest | undefined {
    const { email, code } = object;
    if (email === undefined || code === undefined) {
      return undefined;
    }
    return new PostVerifyRequest(email, code);
  }
}

export class PostVerifyResponse extends BaseResponse {
  _postVerifyResponse!: never;
  private constructor(readonly verified: boolean) {
    super();
  }

  static instantiateBy(verified: boolean): PostVerifyResponse {
    return new PostVerifyResponse(verified);
  }
}
