import { DataSource } from 'typeorm';
import { ContentRepository } from './contentRepository';
import { ContentEntity } from '../entity/content.entity';
import { ScoreEntity } from '../entity/score.entity';
import { Content } from '../../../domain/content';
import { ApprovalStatus } from '../../../domain/approvalStatus';
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

  describe('#find', () => {
    beforeEach(async () => {
      dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: false,
        entities: [ContentEntity, ScoreEntity],
        synchronize: true,
        logging: false,
      });
      await dataSource.initialize();
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
      dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: false,
        entities: [ContentEntity, ScoreEntity],
        synchronize: true,
        logging: false,
      });
      await dataSource.initialize();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find all records', async () => {
      const contents = await contentRepository.findInprogress();
      expect(contents.map((e) => e.id)).toEqual([1, 2]);
    });
  });

  describe('#findApproved', () => {
    beforeEach(async () => {
      dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: false,
        entities: [ContentEntity, ScoreEntity],
        synchronize: true,
        logging: false,
      });
      await dataSource.initialize();
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
      dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: false,
        entities: [ContentEntity, ScoreEntity],
        synchronize: true,
        logging: false,
      });
      await dataSource.initialize();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find all records', async () => {
      const content = await contentRepository.findOne(3);
      expect(content.id).toBe(3);
    });
  });

  describe('#save', () => {
    beforeEach(async () => {
      dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: false,
        entities: [ContentEntity, ScoreEntity],
        synchronize: true,
        logging: false,
      });
      await dataSource.initialize();
      contentRepository = new ContentRepository(dataSource);
      const repository = dataSource.getRepository(ContentEntity);
      await repository.save(initialData);
    });

    it('should find all records', async () => {
      const id = await contentRepository.save(
        Content.instantiate({
          name: '名前',
          description: '説明です',
          imageUrl: 'https://example.com/image.png',
          votes: [],
        }),
      );
      const content = await contentRepository.findOne(id);
      expect(content.id).toBe(id);
    });
  });

  describe('#updateApprovalStatus', () => {
    beforeEach(async () => {
      dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: false,
        entities: [ContentEntity, ScoreEntity],
        synchronize: true,
        logging: false,
      });
      await dataSource.initialize();
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
