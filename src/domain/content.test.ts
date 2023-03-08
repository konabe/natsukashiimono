import { Content } from './content';
import { Vote } from './vote';

describe('Content', () => {
  it('should be created successfully', () => {
    expect(
      Content.instantiate({
        id: 'content_id',
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [],
      }),
    ).toBeDefined();
    expect(
      Content.instantiate({
        id: 'content_id',
        name: '名'.repeat(50),
        description: '説'.repeat(300),
        votes: [],
      }),
    ).toBeDefined();
  });

  it('should be created unsuccessfully', () => {
    expect(
      Content.instantiate({
        name: '名'.repeat(51),
        description: '説'.repeat(300),
        votes: [],
      }),
    ).toBeUndefined();
    expect(
      Content.instantiate({
        name: '名'.repeat(50),
        description: '説'.repeat(301),
        votes: [],
      }),
    ).toBeUndefined();
  });

  it('should filter votes by id when created', () => {
    expect(
      Content.instantiate({
        id: 'content_id_1',
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [
          new Vote('content_id_1', 'user_id_1'),
          new Vote('content_id_2', 'user_id_2'),
          new Vote('content_id_1', 'user_id_3'),
        ],
      })?.votes.length,
    ).toBe(2);
  });

  it('should calculate total score', () => {
    expect(
      Content.instantiate({
        id: 'content_id_1',
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [
          new Vote('content_id_1', 'user_id_1'),
          new Vote('content_id_2', 'user_id_2'),
          new Vote('content_id_1', 'user_id_3'),
        ],
      }).calculateScore(),
    ).toBe(2);
    expect(
      Content.instantiate({
        id: 'content_id_1',
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [
          new Vote('content_id_2', 'user_id_1'),
          new Vote('content_id_2', 'user_id_2'),
          new Vote('content_id_2', 'user_id_3'),
        ],
      }).calculateScore(),
    ).toBe(0);
  });
});
