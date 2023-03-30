import { Content } from '../../../../domain/content';

export class ContentResponseModel {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly score: number,
  ) {}

  static instantiateBy(content: Content): ContentResponseModel | undefined {
    if (content.id == null) {
      // contentがidを持たないのはリクエストのときだけなので。
      return undefined;
    }
    return new ContentResponseModel(
      content.id,
      content.name,
      content.description,
      content.imageUrl,
      content.calculateScore(),
    );
  }
}

export class GetRequestResponse {
  readonly contents: ContentResponseModel[];
  constructor(contents: Content[]) {
    this.contents = contents
      .map((content) => ContentResponseModel.instantiateBy(content))
      .filter((c) => c !== undefined);
  }
}
