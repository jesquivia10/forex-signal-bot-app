import { Candle } from '@domain/models/candle';
import { CandleInterval, DEFAULT_PAIR_ORDER } from '@config/tradingPairs';

import { ForexApiClient } from '../clients/forexApiClient';

export class MarketRepository {
  constructor(private readonly client = new ForexApiClient()) {}

  async fetchLatestSnapshots(pairs = DEFAULT_PAIR_ORDER, interval: CandleInterval = '15min') {
    const results: Record<string, Candle[]> = {};

    await Promise.all(
      pairs.map(async (pair) => {
        const candles = await this.client.fetchIntradayCandles(pair, interval);
        results[pair] = candles;
      }),
    );

    return results;
  }
}
