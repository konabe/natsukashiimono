import { BaseRequest } from '../../../../controller/baseController';

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

export class PostResendResponse {
  private constructor(readonly sent: boolean) {}

  static instantiateBy(sent: boolean): PostResendResponse {
    return new PostResendResponse(sent);
  }
}
