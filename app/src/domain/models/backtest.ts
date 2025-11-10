import { Signal } from './signal';

export interface BacktestResult {
  pair: string;
  startDate: string;
  endDate: string;
  totalSignals: number;
  winRate: number | null;
  profitFactor: number | null;
  equityCurve: { timestamp: string; value: number }[];
  generatedSignals: Signal[];
}
