import { Vote } from '../../../../domain/vote';

export class PostScoreRequest {
  private constructor(readonly contentId: number) {}

  static instantiateBy(object: any): PostScoreRequest | undefined {
    const { contentId } = object;
    if (contentId === undefined) {
      return undefined;
    }
    return new PostScoreRequest(contentId);
  }
}

export class PostScoreResponse {
  private constructor(readonly contentId: number, readonly total: number) {}

  static instantiateBy(votes: Vote[]): PostScoreResponse | undefined {
    const vote = votes[0];
    if (vote === undefined) {
      return undefined;
    }
    return new PostScoreResponse(vote.contentId, votes.length);
  }
}
