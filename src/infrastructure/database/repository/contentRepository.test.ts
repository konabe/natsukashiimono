import { DataSource } from 'typeorm';
import { ContentRepository } from './contentRepository';
import { ContentEntity } from '../entity/content.entity';
import { ScoreEntity } from '../entity/score.entity';
jest.useFakeTimers();

describe('ContentRepository', () => {
  let dataSource: DataSource;
  let contentRepository: ContentRepository;

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
      await repository.save([
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
      ]);
    });

    it('should find all records', async () => {
      const contents = await contentRepository.find();
      expect(contents.length).toBe(4);
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
      await repository.save([
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
      ]);
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
      await repository.save([
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
          approvalStatus: 'approved',
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
      ]);
    });

    it('should find all records', async () => {
      const contents = await contentRepository.findApproved();
      expect(contents.map((e) => e.id)).toEqual([2, 3]);
    });
  });
});
