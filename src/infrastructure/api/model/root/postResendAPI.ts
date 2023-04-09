export class PostResendRequest {
  private constructor(readonly email: string) {}

  static instantiateBy(object: any): PostResendRequest | undefined {
    const { email, code } = object;
    if (email === undefined) {
      return undefined;
    }
    return new PostResendRequest(email);
  }
}

export class PostResendResponse {
  private constructor() {}

  static instantiateBy(): PostResendResponse {
    return new PostResendResponse();
  }
}
