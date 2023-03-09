import { Content } from './content';

export interface IContentRepository {
  save(content: Content): Promise<number>;
}
