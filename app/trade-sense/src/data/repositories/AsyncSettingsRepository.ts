import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_REFRESH_INTERVAL_MINUTES, SUPPORTED_PAIRS } from '../../config/constants';
import type { UserSettings } from '../../domain/entities';
import { IndicatorEngine } from '../../domain/services';
import type { SettingsRepository } from '../../domain/repositories';

const STORAGE_KEY = '@tradesense/settings';

const defaultSettings: UserSettings = {
  preferredPairs: [...SUPPORTED_PAIRS],
  indicatorParameters: IndicatorEngine.defaultParameters(),
  notificationPreference: {
    enabled: false,
    intervalMinutes: DEFAULT_REFRESH_INTERVAL_MINUTES,
  },
  autoRefreshInterval: '15min',
};

export class AsyncSettingsRepository implements SettingsRepository {
  async get(): Promise<UserSettings> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await this.persist(defaultSettings);
      return defaultSettings;
    }
    try {
      const parsed = JSON.parse(raw) as Partial<UserSettings>;
      return {
        ...defaultSettings,
        ...parsed,
        indicatorParameters: {
          ...defaultSettings.indicatorParameters,
          ...(parsed.indicatorParameters ?? {}),
        },
        notificationPreference: {
          ...defaultSettings.notificationPreference,
          ...(parsed.notificationPreference ?? {}),
        },
      };
    } catch (error) {
      console.warn('[AsyncSettingsRepository] Failed to parse settings, resetting.', error);
      await this.persist(defaultSettings);
      return defaultSettings;
    }
  }

  async update(settings: Partial<UserSettings>): Promise<UserSettings> {
    const current = await this.get();
    const next: UserSettings = {
      ...current,
      ...settings,
      indicatorParameters: {
        ...current.indicatorParameters,
        ...(settings.indicatorParameters ?? {}),
      },
      notificationPreference: {
        ...current.notificationPreference,
        ...(settings.notificationPreference ?? {}),
      },
      preferredPairs: settings.preferredPairs ?? current.preferredPairs,
    };
    await this.persist(next);
    return next;
  }

  async reset(): Promise<UserSettings> {
    await this.persist(defaultSettings);
    return defaultSettings;
  }

  private async persist(settings: UserSettings) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}
