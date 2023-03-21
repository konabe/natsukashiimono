import { Content } from 'src/domain/content';

// TODO: 配列で格納するようにする contents: Content[]
export class GetContentResponse {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly score: number,
  ) {}

  static instantiateBy(content: Content): GetContentResponse | undefined {
    if (content.id == null) {
      // contentがidを持たないのはリクエストのときだけなので。
      return undefined;
    }
    return new GetContentResponse(
      content.id,
      content.name,
      content.description,
      content.imageUrl,
      content.calculateScore(),
    );
  }
}
