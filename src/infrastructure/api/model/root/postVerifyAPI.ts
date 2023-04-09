export class PostVerifyRequest {
  private constructor(readonly email: string, readonly code: string) {}

  static instantiateBy(object: any): PostVerifyRequest | undefined {
    const { email, code } = object;
    if (email === undefined || code === undefined) {
      return undefined;
    }
    return new PostVerifyRequest(email, code);
  }
}

export class PostVerifyResponse {
  private constructor() {}

  static instantiateBy(): PostVerifyResponse {
    return new PostVerifyResponse();
  }
}
