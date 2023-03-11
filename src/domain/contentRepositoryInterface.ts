import { Content } from './content';

export interface IContentRepository {
  find(): Promise<Content[]>;
  findOne(id: number): Promise<Content>;
  save(content: Content): Promise<number>;
}
