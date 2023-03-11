import { getMockReq, getMockRes } from '@jest-mock/express';
import { IScoreRepository } from '../../../domain/scoreRepositoryInterface';
import { PostScoreController } from './postScoreController';

describe('PostScoreController', () => {
  let postScoreController: PostScoreController;
  let scoreRepository: IScoreRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    scoreRepository = {
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([
        { contentId: 1, userId: 1 },
        { contentId: 1, userId: 2 },
      ]),
    };
    postScoreController = new PostScoreController({
      scoreRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      body: {
        contentId: 1,
        userId: 1,
      },
    });
    await postScoreController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      contentId: 1,
      total: 2,
    });
  });

  it('should notify 400 error when body is undefined', async () => {
    const req = getMockReq();
    await postScoreController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test.each`
    removedKey     | expected
    ${'contentId'} | ${400}
    ${'userId'}    | ${400}
  `(
    'should notify 400 error when $removedKey is rack',
    async ({ removedKey, expected }) => {
      const preBody = {
        contentId: 1,
        userId: 1,
      };
      delete preBody[removedKey];
      const req = getMockReq({ body: preBody });
      await postScoreController.invoke(req, res);
      expect(res.status).toBeCalledWith(expected);
    },
  );
});
