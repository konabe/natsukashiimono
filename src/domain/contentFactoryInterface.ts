import { Content } from './content';

export interface IContentFactory {
  create(): Promise<Content[]>;
  createOne(id: number): Promise<Content>;
}
