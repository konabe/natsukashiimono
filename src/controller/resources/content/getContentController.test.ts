import { content1 } from '../../../../data/content.data';
import { IContentFactory } from '../../../domain/contentFactoryInterface';
import { GetContentController } from './getContentController';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('getContentController', () => {
  let contentsFactory: IContentFactory;
  let getContentController: GetContentController;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentsFactory = {
      create: jest.fn().mockResolvedValue([content1]),
      createOne: jest.fn(),
    };
    getContentController = new GetContentController({ contentsFactory });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq();
    await getContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        name: '懐かしいもの',
        description: '懐かしいという感情は時間が存在しなければないのだろうか',
        imageUrl: 'https://example.com/index.png',
        score: 2,
      },
    ]);
  });
});
