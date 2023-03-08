import { Vote } from './vote';

export type ContentParameters = {
  id?: string;
  name: string;
  description: string;
  votes: Vote[];
};

export class Content {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly votes: Vote[],
  ) {}

  static instantiate({
    id,
    name,
    description,
    votes,
  }: ContentParameters): Content | undefined {
    if (!(name.length > 0 && name.length <= 50)) {
      return undefined;
    }
    if (!(description.length > 0 && description.length <= 300)) {
      return undefined;
    }
    let filteredVotes: Vote[] = [];
    if (id != null) {
      filteredVotes = votes.filter((v) => v.contentId === id);
    }
    return new Content(id, name, description, filteredVotes);
  }

  calculateScore(): number {
    return this.votes.length;
  }
}
