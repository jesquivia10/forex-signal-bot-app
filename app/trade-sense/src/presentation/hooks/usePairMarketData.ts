import { useQuery } from '@tanstack/react-query';

import type { CandleInterval, CandleSeries } from '../../domain/entities';
import { parsePair } from '../../domain/entities/CurrencyPair';
import { useServices } from '../../app/providers/ServiceProvider';

type Params = {
  pair: string;
  interval?: CandleInterval;
  outputSize?: 'compact' | 'full';
};

export function usePairMarketData({ pair, interval = '15min', outputSize = 'compact' }: Params) {
  const {
    usecases: { fetchMarketData },
  } = useServices();

  return useQuery<CandleSeries, Error>({
    queryKey: ['marketData', pair, interval, outputSize],
    queryFn: () =>
      fetchMarketData.execute({
        pair: parsePair(pair),
        interval,
        outputSize,
      }),
    staleTime: 5 * 60 * 1000,
  });
}
