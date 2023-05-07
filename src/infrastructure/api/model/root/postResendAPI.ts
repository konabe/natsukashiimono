import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostResendRequest extends BaseRequest {
  private constructor(readonly email: string) {
    super();
  }

  static instantiateBy(object: any): PostResendRequest | undefined {
    const { email } = object;
    if (email === undefined) {
      return undefined;
    }
    return new PostResendRequest(email);
  }
}

export class PostResendResponse extends BaseResponse {
  private constructor(readonly sent: boolean) {
    super();
  }

  static instantiateBy(sent: boolean): PostResendResponse {
    return new PostResendResponse(sent);
  }
}
