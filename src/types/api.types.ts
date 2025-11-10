import { Timeframe } from './signal.types';

export interface ForexDataProvider {
  getQuote(symbol: string): Promise<Quote>;
  getTimeSeries(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]>;
  getMultipleQuotes(symbols: string[]): Promise<Quote[]>;
}

export interface Quote {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: Date;
  spread?: number;
}

export interface Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    symbol?: string;
    interval?: string;
    lastRefreshed?: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Alpha Vantage specific types
export interface AlphaVantageResponse {
  'Meta Data'?: {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Interval'?: string;
    '5. Output Size'?: string;
    '6. Time Zone': string;
  };
  'Time Series (Daily)'?: Record<string, AlphaVantageCandle>;
  'Time Series (15min)'?: Record<string, AlphaVantageCandle>;
  'Time Series (5min)'?: Record<string, AlphaVantageCandle>;
  'Time Series (1min)'?: Record<string, AlphaVantageCandle>;
  'Error Message'?: string;
  Note?: string;
}

export interface AlphaVantageCandle {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume'?: string;
}
