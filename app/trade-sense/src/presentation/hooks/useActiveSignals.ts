import { useQuery } from '@tanstack/react-query';

import type { Signal } from '../../domain/entities';
import { useServices } from '../../app/providers/ServiceProvider';
import { DEFAULT_REFRESH_INTERVAL_MINUTES } from '../../config/constants';

type UseActiveSignalsOptions = {
  refreshIntervalMinutes?: number;
};

export function useActiveSignals(options: UseActiveSignalsOptions = {}) {
  const {
    usecases: { generateSignals },
  } = useServices();

  const refreshIntervalMinutes = options.refreshIntervalMinutes ?? DEFAULT_REFRESH_INTERVAL_MINUTES;

  return useQuery<Signal[], Error>({
    queryKey: ['signals', 'active'],
    queryFn: () => generateSignals.execute(),
    staleTime: refreshIntervalMinutes * 60 * 1000,
    refetchInterval: refreshIntervalMinutes * 60 * 1000,
    refetchIntervalInBackground: true,
  });
}
