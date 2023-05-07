import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostVerifyRequest extends BaseRequest {
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
  private constructor(readonly verified: boolean) {
    super();
  }

  static instantiateBy(verified: boolean): PostVerifyResponse {
    return new PostVerifyResponse(verified);
  }
}
