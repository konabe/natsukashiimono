import { Era } from './era';

// 長い時間露出していたものなど
export class Period {
  constructor(readonly start: Era, readonly end: Era) {}
}
