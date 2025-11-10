import { BaseForexApi } from './forexApi';
import { Quote, Candle, AlphaVantageResponse, AlphaVantageCandle } from '@types/api.types';
import { Timeframe } from '@types/signal.types';

export class AlphaVantageApi extends BaseForexApi {
  constructor(apiKey: string) {
    super(apiKey, 'https://www.alphavantage.co/query', 5);
  }

  async getQuote(symbol: string): Promise<Quote> {
    try {
      const response = await this.client.get<AlphaVantageResponse>('', {
        params: {
          function: 'CURRENCY_EXCHANGE_RATE',
          from_currency: symbol.substring(0, 3),
          to_currency: symbol.substring(3, 6),
          apikey: this.apiKey,
        },
      });

      const data = response.data['Realtime Currency Exchange Rate'];
      if (!data) {
        throw new Error('Invalid response from Alpha Vantage');
      }

      const rate = parseFloat(data['5. Exchange Rate']);
      const spread = rate * 0.0002; // Estimate 2 pip spread

      return {
        symbol,
        bid: rate - spread / 2,
        ask: rate + spread / 2,
        timestamp: new Date(data['6. Last Refreshed']),
        spread,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTimeSeries(symbol: string, timeframe: Timeframe, limit: number = 100): Promise<Candle[]> {
    try {
      const interval = this.mapTimeframeToInterval(timeframe);
      const functionName = this.getFunctionForTimeframe(timeframe);

      const response = await this.client.get<AlphaVantageResponse>('', {
        params: {
          function: functionName,
          symbol: `${symbol.substring(0, 3)}/${symbol.substring(3, 6)}`,
          interval: interval,
          outputsize: limit > 100 ? 'full' : 'compact',
          apikey: this.apiKey,
        },
      });

      const timeSeriesKey = this.getTimeSeriesKey(timeframe);
      const timeSeries = response.data[timeSeriesKey];

      if (!timeSeries) {
        if (response.data['Error Message']) {
          throw new Error(response.data['Error Message']);
        }
        if (response.data.Note) {
          throw new Error('API rate limit reached. Please try again later.');
        }
        throw new Error('No time series data available');
      }

      const candles: Candle[] = Object.entries(timeSeries)
        .map(([timestamp, data]) => this.parseCandle(timestamp, data as AlphaVantageCandle))
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      return candles.slice(-limit);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMultipleQuotes(symbols: string[]): Promise<Quote[]> {
    // Alpha Vantage doesn't support batch requests, so we make individual requests
    // with proper rate limiting handled by the base class
    const promises = symbols.map((symbol) => this.getQuote(symbol));
    return Promise.all(promises);
  }

  private parseCandle(timestamp: string, data: AlphaVantageCandle): Candle {
    return {
      timestamp: new Date(timestamp),
      open: parseFloat(data['1. open']),
      high: parseFloat(data['2. high']),
      low: parseFloat(data['3. low']),
      close: parseFloat(data['4. close']),
      volume: data['5. volume'] ? parseFloat(data['5. volume']) : undefined,
    };
  }

  private mapTimeframeToInterval(timeframe: Timeframe): string {
    const mapping: Record<Timeframe, string> = {
      '1min': '1min',
      '5min': '5min',
      '15min': '15min',
      '30min': '30min',
      '1h': '60min',
      '4h': '60min', // Will need to aggregate
      '1D': 'daily',
    };
    return mapping[timeframe] || '15min';
  }

  private getFunctionForTimeframe(timeframe: Timeframe): string {
    if (timeframe === '1D') {
      return 'FX_DAILY';
    }
    return 'FX_INTRADAY';
  }

  private getTimeSeriesKey(timeframe: Timeframe): keyof AlphaVantageResponse {
    if (timeframe === '1D') {
      return 'Time Series (Daily)';
    }
    const interval = this.mapTimeframeToInterval(timeframe);
    return `Time Series (${interval})` as keyof AlphaVantageResponse;
  }
}
