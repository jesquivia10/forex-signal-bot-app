import type { CandleInterval, CandleSeries, CurrencyPair } from '../entities';
import type { MarketDataRepository } from '../repositories';

type Params = {
  pair: CurrencyPair;
  interval: CandleInterval;
  outputSize?: 'compact' | 'full';
};

export class FetchLatestMarketDataUseCase {
  constructor(private readonly marketDataRepository: MarketDataRepository) {}

  execute(params: Params): Promise<CandleSeries> {
    return this.marketDataRepository.getIntradayCandles(params);
  }
}
