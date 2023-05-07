import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostSigninRequest extends BaseRequest {
  private constructor(readonly email: string, readonly password: string) {
    super();
  }

  static instantiateBy(object: any): PostSigninRequest | undefined {
    const { email, password } = object;
    if (email === undefined || password === undefined) {
      return undefined;
    }
    return new PostSigninRequest(email, password);
  }
}

export class PostSigninResponse extends BaseResponse {
  private constructor(readonly token: string) {
    super();
  }

  static instantiateBy(token: string): PostSigninResponse {
    return new PostSigninResponse(token);
  }
}
