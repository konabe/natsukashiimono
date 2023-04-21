import { Content } from '../src/domain/content';
import { Vote } from '../src/domain/vote';

export const content1 = Content.instantiate({
  id: 1,
  name: '懐かしいもの',
  description: '懐かしいという感情は時間が存在しなければないのだろうか',
  imageUrl: 'https://example.com/index.png',
  votes: [new Vote(1, '0'), new Vote(1, '1')],
})!;

export const content2 = Content.instantiate({
  id: 2,
  name: '懐かしいもの',
  description: '懐かしいという感情は時間が存在しなければないのだろうか',
  imageUrl: 'https://example.com/index.png',
  votes: [],
})!;

export const contentNotHaveId = Content.instantiate({
  name: '懐かしいもの',
  description: '懐かしいという感情は時間が存在しなければないのだろうか',
  imageUrl: 'https://example.com/index.png',
  votes: [new Vote(1, '0'), new Vote(1, '1')],
})!;
