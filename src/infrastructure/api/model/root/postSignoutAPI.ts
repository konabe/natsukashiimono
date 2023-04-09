export class PostSignoutRequest {
  private constructor() {}

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
