export class PostSignupRequest {
  private constructor(readonly email: string) {}

  static instantiateBy(object: any): PostSignupRequest | undefined {
    const { email } = object;
    if (email === undefined) {
      return undefined;
    }
    return new PostSignupRequest(email);
  }
}

export class PostSignupResponse {
  private constructor(readonly token: string) {}

  static instantiateBy(token: string): PostSignupResponse {
    return new PostSignupResponse(token);
  }
}
