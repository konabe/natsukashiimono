import { BaseRequest } from '../../../../controller/baseController';

export class PostRequestDeclinedRequest extends BaseRequest {
  private constructor(readonly contentId: number) {
    super();
  }

  static instantiateBy(object: any): PostRequestDeclinedRequest | undefined {
    const { contentId } = object;
    if (contentId === undefined) {
      return undefined;
    }
    return new PostRequestDeclinedRequest(contentId);
  }
}

export class PostRequestDeclinedResponse {}
