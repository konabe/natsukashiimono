import { BaseRequest } from '../../../../controller/baseController';

export class PostSignoutRequest extends BaseRequest {
  private constructor() {
    super();
  }

  static instantiateBy(_: any): PostSignoutRequest | undefined {
    return new PostSignoutRequest();
  }
}

export class PostSignoutResponse {
  private constructor(readonly successed: boolean) {}

  static instantiateBy(successed: boolean): PostSignoutResponse {
    return new PostSignoutResponse(successed);
  }
}
