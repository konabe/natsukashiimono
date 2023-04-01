export class PostRequestDeclinedRequest {
  private constructor(readonly contentId: number) {}

  static instantiateBy(object: any): PostRequestDeclinedRequest | undefined {
    const { contentId } = object;
    if (contentId === undefined) {
      return undefined;
    }
    return new PostRequestDeclinedRequest(contentId);
  }
}

export class PostRequestDeclinedResponse {}
