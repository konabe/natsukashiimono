import { Content } from '../../../../domain/content';
import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';

export class PostContentRequest extends BaseRequest {
  _postContentRequest!: never;
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

  createContent(): Content | undefined {
    const content = Content.instantiate({
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      votes: [],
    });
    return content;
  }
}

export class PostContentResponse extends BaseResponse {
  _postContentResponse!: never;
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly score: number,
  ) {
    super();
  }

  static instantiateBy(
    content: Content | undefined,
  ): PostContentResponse | undefined {
    if (content === undefined) {
      return undefined;
    }
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
