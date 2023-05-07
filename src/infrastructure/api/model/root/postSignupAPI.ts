import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostSignupRequest extends BaseRequest {
  private constructor(readonly email: string, readonly password: string) {
    super();
  }

  static instantiateBy(object: any): PostSignupRequest | undefined {
    const { email, password } = object;
    if (email === undefined || password === undefined) {
      return undefined;
    }
    return new PostSignupRequest(email, password);
  }
}

export class PostSignupResponse extends BaseResponse {
  private constructor(readonly successed: boolean) {
    super();
  }

  static instantiateBy(successed: boolean): PostSignupResponse {
    return new PostSignupResponse(successed);
  }
}
