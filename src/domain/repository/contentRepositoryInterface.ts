import { ApprovalStatus } from '../approvalStatus';
import { Content } from '../content';

export type UpdateContentArguments = {
  name: string;
  description: string;
  imageUrl: string;
};

export interface IContentRepository {
  find(): Promise<Content[]>;
  findOne(id: number): Promise<Content | undefined>;
  findInprogress(): Promise<Content[]>;
  findApproved(): Promise<Content[]>;
  create(content: Content): Promise<number>;
  update(
    id: number,
    props: UpdateContentArguments,
  ): Promise<Content | undefined>;
  updateApprovalStatus(
    id: number,
    status: ApprovalStatus,
  ): Promise<number | undefined>;
}
