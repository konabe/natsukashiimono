// 年代などの昔を思い出すときに使われる淡い期間
export interface Era {
  toString(): String;
}

// 1940年代
export class TenYearsEra implements Era {
  constructor(readonly year: number) {}

  toString(): String {
    return `${this.year}年代`;
  }
}

// 1945年
export class YearEra implements Era {
  constructor(readonly year: number) {}

  toString(): String {
    return `${this.year}年`;
  }
}

// ピンポイントで何時何分に起きたかがわかっている場合 1945/8/6 8:15
export class Time implements Era {
  constructor(readonly date: Date) {}

  toString(): String {
    return this.date.toString();
  }
}
