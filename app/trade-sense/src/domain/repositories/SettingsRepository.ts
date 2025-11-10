import type { UserSettings } from '../entities';

export interface SettingsRepository {
  get(): Promise<UserSettings>;
  update(settings: Partial<UserSettings>): Promise<UserSettings>;
  reset(): Promise<UserSettings>;
}
