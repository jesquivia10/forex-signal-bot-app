import axios, { AxiosInstance } from 'axios';

import { hasAlphaVantageKey, requireAlphaVantageKey } from '../../config/env';
import type { CandleInterval } from '../../domain/entities';
import type { AlphaVantageIntradayResponse } from './alphaVantageTypes';

const BASE_URL = 'https://www.alphavantage.co/query';

type IntradayParams = {
  fromSymbol: string;
  toSymbol: string;
  interval: CandleInterval;
  outputSize?: 'compact' | 'full';
};

export class AlphaVantageClient {
  private readonly http: AxiosInstance;
  private readonly apiKey: string;

  constructor(apiKey = hasAlphaVantageKey() ? requireAlphaVantageKey() : '') {
    this.apiKey = apiKey;
    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 15_000,
    });
  }

  async fetchIntraday(params: IntradayParams): Promise<AlphaVantageIntradayResponse> {
    if (!this.apiKey) {
      throw new Error('Alpha Vantage API key is required to fetch market data.');
    }

    const response = await this.http.get<AlphaVantageIntradayResponse>('', {
      params: {
        function: 'FX_INTRADAY',
        from_symbol: params.fromSymbol,
        to_symbol: params.toSymbol,
        interval: params.interval,
        outputsize: params.outputSize ?? 'compact',
        apikey: this.apiKey,
      },
    });

    const data = response.data;

    if (data.Note) {
      throw new Error(`Alpha Vantage rate limit exceeded: ${data.Note}`);
    }

    if (data.Information) {
      throw new Error(`Alpha Vantage information: ${data.Information}`);
    }

    if (data['Error Message']) {
      throw new Error(`Alpha Vantage error: ${data['Error Message']}`);
    }

    return data;
  }
}
