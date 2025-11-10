import type { Candle, CandleSeries, CandleInterval, CurrencyPair } from '../entities';

export interface MarketDataRepository {
  getIntradayCandles(params: {
    pair: CurrencyPair;
    interval: CandleInterval;
    outputSize?: 'compact' | 'full';
  }): Promise<CandleSeries>;
}
