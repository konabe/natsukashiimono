import { Content } from 'src/domain/content';
import { BaseRequest } from '../../../../controller/baseController';

export class PostContentRequest extends BaseRequest {
  private constructor(
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
  ) {
    super();
  }

  static instantiateBy(object: any): PostContentRequest | undefined {
    const { name, description, imageUrl } = object;
    if (
      name === undefined ||
      description === undefined ||
      imageUrl === undefined
    ) {
      return undefined;
    }
    return new PostContentRequest(name, description, imageUrl);
  }
}

export class PostContentResponse {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly score: number,
  ) {}

  static instantiateBy(content: Content): PostContentResponse | undefined {
    if (content.id == null) {
      // contentがidを持たないのはリクエストのときだけなので。
      return undefined;
    }
    return new PostContentResponse(
      content.id,
      content.name,
      content.description,
      content.imageUrl,
      content.calculateScore(),
    );
  }
}
