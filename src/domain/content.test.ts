import { Content } from './content';
import { Vote } from './vote';

describe('Content', () => {
  it('should be created successfully', () => {
    expect(
      Content.instantiate({
        id: 0,
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        imageUrl: 'https://example.com/index.png',
        votes: [],
      }),
    ).toBeDefined();
    expect(
      Content.instantiate({
        id: 0,
        name: '名'.repeat(50),
        description: '説'.repeat(300),
        imageUrl: 'https://example.com/index.png',
        votes: [],
      }),
    ).toBeDefined();
  });

  it('should be created unsuccessfully', () => {
    expect(
      Content.instantiate({
        name: '名'.repeat(51),
        description: '説'.repeat(300),
        imageUrl: 'https://example.com/index.png',
        votes: [],
      }),
    ).toBeUndefined();
    expect(
      Content.instantiate({
        name: '名'.repeat(50),
        description: '説'.repeat(301),
        imageUrl: 'https://example.com/index.png',
        votes: [],
      }),
    ).toBeUndefined();
  });

  it('should filter votes by id when created', () => {
    expect(
      Content.instantiate({
        id: 1,
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [new Vote(1, 1), new Vote(2, 2), new Vote(1, 3)],
        imageUrl: 'https://example.com/index.png',
      })?.votes.length,
    ).toBe(2);
  });

  it('should calculate total score', () => {
    expect(
      Content.instantiate({
        id: 1,
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [new Vote(1, 1), new Vote(2, 2), new Vote(1, 3)],
        imageUrl: 'https://example.com/index.png',
      }).calculateScore(),
    ).toBe(2);
    expect(
      Content.instantiate({
        id: 1,
        name: '太陽の塔',
        description: '大阪万博のモチーフです',
        votes: [new Vote(2, 1), new Vote(2, 2), new Vote(2, 3)],
        imageUrl: 'https://example.com/index.png',
      }).calculateScore(),
    ).toBe(0);
  });
});
