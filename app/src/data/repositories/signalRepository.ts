import AsyncStorage from '@react-native-async-storage/async-storage';

import { Signal } from '@domain/models/signal';

const STORAGE_KEY = '@tradesense/signals';

export class SignalRepository {
  async loadHistory(): Promise<Signal[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Signal[];
    } catch (error) {
      console.warn('[SignalRepository] loadHistory error', error);
      return [];
    }
  }

  async persistHistory(signals: Signal[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(signals));
    } catch (error) {
      console.warn('[SignalRepository] persistHistory error', error);
    }
  }
}
