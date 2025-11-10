import type { IndicatorSnapshot } from './IndicatorSnapshot';

export type SignalDirection = 'buy' | 'sell';

export type Signal = {
  id: string;
  pair: string;
  direction: SignalDirection;
  confidence: number; // between 0 and 1
  rationale: string[];
  createdAt: string;
  indicatorSnapshot: IndicatorSnapshot;
};
