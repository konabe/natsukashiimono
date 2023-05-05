import { ApprovalStatus } from '../approvalStatus';
import { Content } from '../content';

export interface IContentRepository {
  find(): Promise<Content[]>;
  findOne(id: number): Promise<Content | undefined>;
  findInprogress(): Promise<Content[]>;
  findApproved(): Promise<Content[]>;
  create(content: Content): Promise<number>;
  updateApprovalStatus(
    id: number,
    status: ApprovalStatus,
  ): Promise<number | undefined>;
}
