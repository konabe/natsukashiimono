import { Content } from 'src/domain/content';

export type ContentResponseParameters = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  score: number;
};

export class ContentResponse {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly score: number;

  constructor({
    id,
    name,
    description,
    imageUrl,
    score,
  }: ContentResponseParameters) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.score = score;
  }

  static instantiateBy(content: Content): ContentResponse | undefined {
    if (content.id == null) {
      return undefined;
    }
    return new ContentResponse({
      id: content.id,
      name: content.name,
      description: content.description,
      imageUrl: content.imageUrl,
      score: content.calculateScore(),
    });
  }
}
