import { ApprovalStatus } from '../approvalStatus';
import { Content } from '../content';

export interface IContentRepository {
  find(): Promise<Content[]>;
  findOne(id: number): Promise<Content>;
  findInprogress(): Promise<Content[]>;
  findApproved(): Promise<Content[]>;
  save(content: Content): Promise<number>;
  updateApprovalStatus(
    id: number,
    status: ApprovalStatus,
  ): Promise<number | undefined>;
}
