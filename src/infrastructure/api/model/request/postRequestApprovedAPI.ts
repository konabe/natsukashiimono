import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostRequestApprovedRequest extends BaseRequest {
  _postRequestApprovadRequest!: never;
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

export class PostRequestApprovalResponse extends BaseResponse {
  _postRequestApprovadResponse!: never;
}
