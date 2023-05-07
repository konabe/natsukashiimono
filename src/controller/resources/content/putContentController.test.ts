import { getMockRes } from '@jest-mock/express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PutContentController } from './putContentController';
import {
  contentRepositoryMock,
  userRepositoryAdminMock,
} from '../../../../data/repository.mocks';
import { getPUTMockReqWithToken } from '../../../../data/mockReq';
import { content1 } from '../../../../data/content.data';

describe('PutContentController', () => {
  let putContentController: PutContentController;
  let userRepository: IUserRepository;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryAdminMock,
    };
    contentRepository = {
      ...contentRepositoryMock,
      update: jest.fn().mockResolvedValue(content1),
    };
    putContentController = new PutContentController({
      userRepository,
      contentRepository,
    });
    clearMockRes();
  });

  it('should update content', async () => {
    const req = getPUTMockReqWithToken(
      {
        name: '名前です',
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
      { id: '1' },
    );
    await putContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      description: '懐かしいという感情は時間が存在しなければないのだろうか',
      id: 1,
      imageUrl: 'https://example.com/index.png',
      name: '懐かしいもの',
      score: 2,
    });
  });

  it('should update content', async () => {
    const req = getPUTMockReqWithToken(
      {
        name: '名前です',
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
      { id: '1' },
    );
    await putContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      description: '懐かしいという感情は時間が存在しなければないのだろうか',
      id: 1,
      imageUrl: 'https://example.com/index.png',
      name: '懐かしいもの',
      score: 2,
    });
  });

  it('should reject with 400 if id is undefined', async () => {
    const req = getPUTMockReqWithToken(
      {
        name: '名前です',
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
      { id: undefined },
    );
    await putContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should reject with 400 if content is invalid', async () => {
    const req = getPUTMockReqWithToken(
      {
        name: '',
        description: '',
        imageUrl: '',
      },
      { id: '1' },
    );
    await putContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });
});
