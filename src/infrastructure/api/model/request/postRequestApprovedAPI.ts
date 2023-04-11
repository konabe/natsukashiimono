import { BaseRequest } from '../../../../controller/baseController';

export class PostRequestApprovedRequest extends BaseRequest {
  private constructor(readonly contentId: number) {
    super();
  }

  static instantiateBy(object: any): PostRequestApprovedRequest | undefined {
    const { contentId } = object;
    if (contentId === undefined) {
      return undefined;
    }
    return new PostRequestApprovedRequest(contentId);
  }
}

export class PostRequestApprovalResponse {}
