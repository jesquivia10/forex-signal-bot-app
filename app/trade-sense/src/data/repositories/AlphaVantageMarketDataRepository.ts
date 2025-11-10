import type { CandleInterval, CandleSeries, CurrencyPair } from '../../domain/entities';
import type { MarketDataRepository } from '../../domain/repositories';
import { AlphaVantageClient } from '../api/alphaVantageClient';
import { mapAlphaVantageIntraday } from '../mappers/alphaVantageMapper';

type Params = {
  pair: CurrencyPair;
  interval: CandleInterval;
  outputSize?: 'compact' | 'full';
};

export class AlphaVantageMarketDataRepository implements MarketDataRepository {
  constructor(private readonly client: AlphaVantageClient = new AlphaVantageClient()) {}

  async getIntradayCandles({ pair, interval, outputSize }: Params): Promise<CandleSeries> {
    const response = await this.client.fetchIntraday({
      fromSymbol: pair.base,
      toSymbol: pair.quote,
      interval,
      outputSize,
    });

    return mapAlphaVantageIntraday(response, interval);
  }
}
