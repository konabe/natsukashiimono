export class PostSignupRequest {
  private constructor(readonly email: string, readonly password: string) {}

  static instantiateBy(object: any): PostSignupRequest | undefined {
    const { email, password } = object;
    if (email === undefined || password === undefined) {
      return undefined;
    }
    return new PostSignupRequest(email, password);
  }
}

export class PostSignupResponse {
  private constructor() {}

  static instantiateBy(): PostSignupResponse {
    return new PostSignupResponse();
  }
}
