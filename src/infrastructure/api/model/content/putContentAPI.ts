import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';
import { Content } from '../../../../domain/content';

export class PutContentRequest extends BaseRequest {
  _putContentRequest!: never;
  private constructor(
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
  ) {
    super();
  }

  static instantiateBy(object: any): PutContentRequest | undefined {
    const { name, description, imageUrl } = object;
    if (
      name === undefined ||
      description === undefined ||
      imageUrl === undefined
    ) {
      return undefined;
    }
    return new PutContentRequest(name, description, imageUrl);
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

export class PutContentResponse extends BaseResponse {
  _putContentResponse!: never;
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
  ): PutContentResponse | undefined {
    if (content === undefined) {
      return undefined;
    }
    if (content.id == null) {
      // contentがidを持たないのはリクエストのときだけなので。
      return undefined;
    }
    return new PutContentResponse(
      content.id,
      content.name,
      content.description,
      content.imageUrl,
      content.calculateScore(),
    );
  }
}
