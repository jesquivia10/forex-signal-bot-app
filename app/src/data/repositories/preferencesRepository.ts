import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_USER_PREFERENCES, UserPreferences } from '@domain/models/preferences';

const STORAGE_KEY = '@tradesense/preferences';

export class PreferencesRepository {
  async loadPreferences(): Promise<UserPreferences> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_USER_PREFERENCES;
      return { ...DEFAULT_USER_PREFERENCES, ...(JSON.parse(raw) as UserPreferences) };
    } catch (error) {
      console.warn('[PreferencesRepository] loadPreferences error', error);
      return DEFAULT_USER_PREFERENCES;
    }
  }

  async persistPreferences(preferences: UserPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.warn('[PreferencesRepository] persistPreferences error', error);
    }
  }
}
