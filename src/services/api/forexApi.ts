import axios, { AxiosInstance } from 'axios';
import { ForexDataProvider, Quote, Candle, ApiError } from '@types/api.types';
import { Timeframe } from '@types/signal.types';

export abstract class BaseForexApi implements ForexDataProvider {
  protected client: AxiosInstance;
  protected apiKey: string;
  protected baseURL: string;
  protected requestCount: number = 0;
  protected lastRequestTime: number = 0;
  protected rateLimitPerMinute: number;

  constructor(apiKey: string, baseURL: string, rateLimitPerMinute: number = 5) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.rateLimitPerMinute = rateLimitPerMinute;
    
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config) => {
        await this.checkRateLimit();
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = {
          code: error.code || 'UNKNOWN_ERROR',
          message: error.message || 'An unknown error occurred',
          details: error.response?.data,
        };
        return Promise.reject(apiError);
      }
    );
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < 60000) {
      this.requestCount++;
      if (this.requestCount >= this.rateLimitPerMinute) {
        const waitTime = 60000 - timeSinceLastRequest;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        this.requestCount = 0;
        this.lastRequestTime = Date.now();
      }
    } else {
      this.requestCount = 1;
      this.lastRequestTime = now;
    }
  }

  abstract getQuote(symbol: string): Promise<Quote>;
  abstract getTimeSeries(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]>;
  abstract getMultipleQuotes(symbols: string[]): Promise<Quote[]>;

  protected handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw {
        code: error.code || 'API_ERROR',
        message: error.message,
        details: error.response?.data,
      } as ApiError;
    }
    throw {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      details: error,
    } as ApiError;
  }
}
