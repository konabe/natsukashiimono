import { BaseRequest } from '../../../../controller/controllerAdaptor';

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

export class PostVerifyResponse {
  private constructor(readonly verified: boolean) {}

  static instantiateBy(verified: boolean): PostVerifyResponse {
    return new PostVerifyResponse(verified);
  }
}
