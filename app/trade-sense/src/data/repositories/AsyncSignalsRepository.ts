import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

import type { Signal } from '../../domain/entities';
import type { SignalsRepository } from '../../domain/repositories';

const STORAGE_KEY = '@tradesense/signals';

export class AsyncSignalsRepository implements SignalsRepository {
  constructor(private readonly maxItems = 200) {}

  async save(signal: Signal): Promise<void> {
    const current = await this.readAll();
    const deduped = current.filter((item) => item.id !== signal.id);
    const next = [signal, ...deduped].slice(0, this.maxItems);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async saveMany(signals: Signal[]): Promise<void> {
    if (signals.length === 0) {
      return;
    }
    const current = await this.readAll();
    const map = new Map<string, Signal>();
    for (const signal of [...signals, ...current]) {
      map.set(signal.id, signal);
    }
    const next = Array.from(map.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, this.maxItems);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async getRecent(limit = 50): Promise<Signal[]> {
    const current = await this.readAll();
    return current.slice(0, limit);
  }

  async getByPair(pair: string, limit = 50): Promise<Signal[]> {
    const current = await this.readAll();
    return current.filter((item) => item.pair === pair).slice(0, limit);
  }

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  private async readAll(): Promise<Signal[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed: Signal[] = JSON.parse(raw);
      return parsed
        .map((item) => ({
          ...item,
          createdAt: dayjs(item.createdAt).toISOString(),
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.warn('[AsyncSignalsRepository] Failed to read signals', error);
      return [];
    }
  }
}
