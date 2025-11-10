import type { Signal } from '../entities';

export interface SignalsRepository {
  save(signal: Signal): Promise<void>;
  saveMany(signals: Signal[]): Promise<void>;
  getRecent(limit?: number): Promise<Signal[]>;
  getByPair(pair: string, limit?: number): Promise<Signal[]>;
  clearAll(): Promise<void>;
}
