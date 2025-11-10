import { IndicatorSet } from './technicals';

export type SignalDirection = 'buy' | 'sell';
export type SignalConfidence = 'low' | 'medium' | 'high';

export interface Signal {
  id: string;
  pair: string;
  direction: SignalDirection;
  confidence: SignalConfidence;
  createdAt: string;
  price: number;
  rationale: string[];
  indicators: IndicatorSet;
}
