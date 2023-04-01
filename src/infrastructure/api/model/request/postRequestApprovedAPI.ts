export class PostRequestApprovedRequest {
  private constructor(readonly contentId: number) {}

  static instantiateBy(object: any): PostRequestApprovedRequest | undefined {
    const { contentId } = object;
    if (contentId === undefined) {
      return undefined;
    }
    return new PostRequestApprovedRequest(contentId);
  }
}

export class PostRequestApprovalResponse {}
