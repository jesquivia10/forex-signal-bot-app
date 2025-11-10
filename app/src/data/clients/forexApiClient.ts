import { Candle } from '@domain/models/candle';
import { CandleInterval } from '@config/tradingPairs';

import { generateMockCandles } from './mockData';

const resolveApiKey = (): string | undefined => {
  try {
    // eslint-disable-next-line global-require
    const Constants = require('expo-constants').default;
    const manifestExtra =
      Constants?.expoConfig?.extra ?? Constants?.manifest?.extra ?? Constants?.manifest2?.extra;
    return manifestExtra?.alphaVantageApiKey as string | undefined;
  } catch {
    return undefined;
  }
};

const API_BASE_URL = 'https://www.alphavantage.co/query';

export class ForexApiClient {
  constructor(private readonly apiKey = resolveApiKey()) {}

  private getSymbols(pair: string) {
    return {
      from: pair.substring(0, 3),
      to: pair.substring(3),
    };
  }

  private buildUrl(pair: string, interval: CandleInterval): string {
    const { from, to } = this.getSymbols(pair);
    const params = new URLSearchParams({
      function: 'FX_INTRADAY',
      from_symbol: from,
      to_symbol: to,
      interval,
      outputsize: 'compact',
      datatype: 'json',
      apikey: this.apiKey ?? '',
    });
    return `${API_BASE_URL}?${params.toString()}`;
  }

  private mapAlphaVantageResponse(pair: string, json: any): Candle[] {
    const raw = json?.[`Time Series FX (${json?.['Meta Data']?.['4. Interval'] ?? '15min'})`];
    if (!raw) {
      return generateMockCandles(pair);
    }
    return Object.entries(raw)
      .map(([timestamp, values]) => ({
        timestamp: new Date(timestamp).toISOString(),
        open: Number(values['1. open']),
        high: Number(values['2. high']),
        low: Number(values['3. low']),
        close: Number(values['4. close']),
        volume: Number(values['5. volume'] ?? 0),
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async fetchIntradayCandles(pair: string, interval: CandleInterval): Promise<Candle[]> {
    if (!this.apiKey) {
      return generateMockCandles(pair);
    }

    try {
      const response = await fetch(this.buildUrl(pair, interval));
      const json = await response.json();
      if (json?.Note) {
        // API limit reached, fall back to mock data
        return generateMockCandles(pair);
      }
      return this.mapAlphaVantageResponse(pair, json);
    } catch (error) {
      console.warn('[ForexApiClient] fetchIntradayCandles error', error);
      return generateMockCandles(pair);
    }
  }
}
