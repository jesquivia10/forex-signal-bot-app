import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  private static readonly PREFIX = '@tradesense:';

  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(this.PREFIX + key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(this.PREFIX + key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PREFIX + key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter((key) => key.startsWith(this.PREFIX));
      await AsyncStorage.multiRemove(appKeys);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  static async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys
        .filter((key) => key.startsWith(this.PREFIX))
        .map((key) => key.replace(this.PREFIX, ''));
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }
}

// Storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'settings',
  SIGNAL_HISTORY: 'signal_history',
  FAVORITE_PAIRS: 'favorite_pairs',
  THEME: 'theme',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  LAST_UPDATE: 'last_update',
  USER_PREFERENCES: 'user_preferences',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;
