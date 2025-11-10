import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { UserSettings } from '../../domain/entities';
import type { IndicatorParameters, NotificationPreference } from '../../domain/entities/UserSettings';
import { useServices } from '../../app/providers/ServiceProvider';

type UpdatePayload = Partial<Pick<UserSettings, 'preferredPairs' | 'autoRefreshInterval'>> & {
  indicatorParameters?: Partial<IndicatorParameters>;
  notificationPreference?: Partial<NotificationPreference>;
};

export function useUserSettings() {
  const queryClient = useQueryClient();
  const {
    repositories: { settings },
    usecases: { updateUserSettings },
  } = useServices();

  const settingsQuery = useQuery<UserSettings>({
    queryKey: ['settings'],
    queryFn: () => settings.get(),
    staleTime: Infinity,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdatePayload) => updateUserSettings.execute(payload),
    onSuccess: (next) => {
      queryClient.setQueryData(['settings'], next);
    },
  });

  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    error: settingsQuery.error,
    updateSettings: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
