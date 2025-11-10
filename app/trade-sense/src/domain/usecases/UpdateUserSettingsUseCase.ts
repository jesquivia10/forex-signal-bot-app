import type { IndicatorParameters, NotificationPreference, UserSettings } from '../entities';
import type { SettingsRepository } from '../repositories';

type UpdateParams = Partial<Pick<UserSettings, 'preferredPairs' | 'autoRefreshInterval'>> & {
  indicatorParameters?: Partial<IndicatorParameters>;
  notificationPreference?: Partial<NotificationPreference>;
};

export class UpdateUserSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute(params: UpdateParams): Promise<UserSettings> {
    const current = await this.settingsRepository.get().catch(() => this.settingsRepository.reset());

    const updates: Partial<UserSettings> = {};

    if (params.preferredPairs) {
      updates.preferredPairs = params.preferredPairs;
    }

    if (params.autoRefreshInterval) {
      updates.autoRefreshInterval = params.autoRefreshInterval;
    }

    if (params.indicatorParameters) {
      updates.indicatorParameters = {
        ...current.indicatorParameters,
        ...params.indicatorParameters,
      };
    }

    if (params.notificationPreference) {
      updates.notificationPreference = {
        ...current.notificationPreference,
        ...params.notificationPreference,
      };
    }

    if (Object.keys(updates).length === 0) {
      return current;
    }

    return this.settingsRepository.update(updates);
  }
}
