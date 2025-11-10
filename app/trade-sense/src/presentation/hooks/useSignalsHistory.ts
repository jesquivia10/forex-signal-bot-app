import { useQuery } from '@tanstack/react-query';

import type { Signal } from '../../domain/entities';
import { useServices } from '../../app/providers/ServiceProvider';

type UseSignalsHistoryParams = {
  pair?: string;
  limit?: number;
};

export function useSignalsHistory(params: UseSignalsHistoryParams = {}) {
  const {
    usecases: { getSignalsHistory },
  } = useServices();

  return useQuery<Signal[], Error>({
    queryKey: ['signals', 'history', params.pair ?? 'all', params.limit ?? 'default'],
    queryFn: () => getSignalsHistory.execute(params),
  });
}
