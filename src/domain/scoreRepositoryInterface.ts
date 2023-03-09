import { Vote } from './vote';

export interface IScoreRepository {
  find(byContentId: number): Promise<Vote[]>;
  save(vote: Vote): Promise<void>;
}
