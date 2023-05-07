import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';
import { Vote } from '../../../../domain/vote';

export class PostScoreRequest extends BaseRequest {
  private constructor(readonly contentId: number) {
    super();
  }

  static instantiateBy(object: any): PostScoreRequest | undefined {
    const { contentId } = object;
    if (contentId === undefined) {
      return undefined;
    }
    return new PostScoreRequest(contentId);
  }
}

export class PostScoreResponse extends BaseResponse {
  private constructor(readonly contentId: number, readonly total: number) {
    super();
  }

  static instantiateBy(votes: Vote[]): PostScoreResponse | undefined {
    const vote = votes[0];
    if (vote === undefined) {
      return undefined;
    }
    return new PostScoreResponse(vote.contentId, votes.length);
  }
}
