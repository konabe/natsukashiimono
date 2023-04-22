import { TenYearsEra, Time, YearEra } from './era';

describe('Time', () => {
  describe('#constructor', () => {
    it('should create', () => {
      const time = new Time(new Date('1945-08-06T08:15:16'));
      expect(time).toBeDefined();
      expect(time.toString()).toBe(
        'Mon Aug 06 1945 08:15:16 GMT+0900 (Japan Standard Time)',
      );
    });
  });
});

describe('YearEra', () => {
  describe('#constructor', () => {
    it('should create', () => {
      const era = new YearEra(1945);
      expect(era).toBeDefined();
      expect(era.toString()).toBe('1945年');
    });
  });
});

describe('TenYearsEra', () => {
  describe('#constructor', () => {
    it('should create', () => {
      const era = new TenYearsEra(1940);
      expect(era).toBeDefined();
      expect(era.toString()).toBe('1940年代');
    });
  });
});
