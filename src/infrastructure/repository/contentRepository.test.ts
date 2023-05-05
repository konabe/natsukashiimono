import { DataSource } from 'typeorm';
import { ContentRepository } from './contentRepository';
import { ContentEntity } from '../database/entity/content.entity';
import { ScoreEntity } from '../database/entity/score.entity';
import { Content } from '../../domain/content';
import { ApprovalStatus } from '../../domain/approvalStatus';
jest.useFakeTimers();

describe('ContentRepository', () => {
  let dataSource: DataSource;
  let contentRepository: ContentRepository;
  const initialData = [
    {
      id: 1,
      name: '懐かしいもの１',
      description: '説明１',
      imageUrl: 'https://example.com/1.png',
      approvalStatus: 'inprogress',
    },
    {
      id: 2,
      name: '懐かしいもの２',
      description: '説明２',
      imageUrl: 'https://example.com/2.png',
      approvalStatus: 'inprogress',
    },
    {
      id: 3,
      name: '懐かしいもの３',
      description: '説明３',
      imageUrl: 'https://example.com/3.png',
      approvalStatus: 'approved',
    },
    {
      id: 4,
      name: '懐かしいもの４',
      description: '説明４',
      imageUrl: 'https://example.com/4.png',
      approvalStatus: 'declined',
    },
    {
      id: 5,
      name: '懐かしいもの５',
      description: '説明５',
      imageUrl: 'https://example.com/5.png',
      approvalStatus: 'approved',
    },
  ];
  const createDataSource = async () => {
    const localDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: false,
      entities: [ContentEntity, ScoreEntity],
      synchronize: true,
      logging: false,
    });
    await localDataSource.initialize();
    return localDataSource;
  };

  describe('#find', () => {
    beforeEach(async () => {
      dataSource = await createDataSource();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find all records', async () => {
      const contents = await contentRepository.find();
      expect(contents.length).toBe(5);
    });
  });

  describe('#findInprogress', () => {
    beforeEach(async () => {
      dataSource = await createDataSource();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find all inprogress records', async () => {
      const contents = await contentRepository.findInprogress();
      expect(contents.map((e) => e.id)).toEqual([1, 2]);
    });
  });

  describe('#findApproved', () => {
    beforeEach(async () => {
      dataSource = await createDataSource();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find all records', async () => {
      const contents = await contentRepository.findApproved();
      expect(contents.map((e) => e.id)).toEqual([3, 5]);
    });
  });

  describe('#findOne', () => {
    beforeEach(async () => {
      dataSource = await createDataSource();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find content where id is 3', async () => {
      const content = await contentRepository.findOne(3);
      expect(content?.id).toBe(3);
    });
  });

  describe('#save', () => {
    beforeEach(async () => {
      dataSource = await createDataSource();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should save with new id', async () => {
      const id = await contentRepository.create(
        Content.instantiate({
          name: '名前',
          description: '説明です',
          imageUrl: 'https://example.com/image.png',
          votes: [],
        })!,
      );
      const content = await contentRepository.findOne(id);
      // すでにid=5まで入っているので、6が入っていることを確認する
      expect(content?.id).toBe(6);
    });

    it('should update exist record', async () => {
      const id = await contentRepository.create(
        Content.instantiate({
          id: 1,
          name: '懐かしかったもの１',
          description: '説明を変えます',
          imageUrl: 'https://example.com/image-new.png',
          votes: [],
        })!,
      );
      const content = await contentRepository.findOne(id);
      expect(content?.id).toBe(1);
      expect(content?.name).toBe('懐かしかったもの１');
      expect(content?.description).toBe('説明を変えます');
      expect(content?.imageUrl).toBe('https://example.com/image-new.png');
      expect(content?.votes).toEqual([]);
    });
  });

  describe('#updateApprovalStatus', () => {
    beforeEach(async () => {
      dataSource = await createDataSource();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should update approval status', async () => {
      const preContents = await contentRepository.findApproved();
      expect(preContents.map((c) => c.id)).toEqual([3, 5]);
      const id = await contentRepository.updateApprovalStatus(
        1,
        ApprovalStatus.APPROVED,
      );
      expect(id).toBe(1);
      const contents = await contentRepository.findApproved();
      expect(contents.map((c) => c.id)).toEqual([1, 3, 5]);
    });

    it('should update approval status when already approved', async () => {
      const preContents = await contentRepository.findApproved();
      expect(preContents.map((c) => c.id)).toEqual([3, 5]);
      const id = await contentRepository.updateApprovalStatus(
        3,
        ApprovalStatus.APPROVED,
      );
      expect(id).toBe(3);
      const contents = await contentRepository.findApproved();
      expect(contents.map((c) => c.id)).toEqual([3, 5]);
    });

    it('should update approval status when already declined', async () => {
      const preContents = await contentRepository.findApproved();
      expect(preContents.map((c) => c.id)).toEqual([3, 5]);
      const id = await contentRepository.updateApprovalStatus(
        4,
        ApprovalStatus.APPROVED,
      );
      expect(id).toBe(4);
      const contents = await contentRepository.findApproved();
      expect(contents.map((c) => c.id)).toEqual([3, 4, 5]);
    });

    it('should not update if id is not found and return undefined', async () => {
      const preContents = await contentRepository.findApproved();
      expect(preContents.map((c) => c.id)).toEqual([3, 5]);
      const id = await contentRepository.updateApprovalStatus(
        -1,
        ApprovalStatus.APPROVED,
      );
      expect(id).toBeUndefined();
      const contents = await contentRepository.findApproved();
      expect(contents.map((c) => c.id)).toEqual([3, 5]);
    });
  });
});
