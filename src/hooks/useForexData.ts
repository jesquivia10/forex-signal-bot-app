import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AlphaVantageApi } from '@services/api/alphaVantage';
import { Quote, Candle } from '@types/api.types';
import { Timeframe } from '@types/signal.types';
import { API_CONFIG } from '@config/api.config';

const forexApi = new AlphaVantageApi(API_CONFIG.ALPHA_VANTAGE.API_KEY);

export const useForexQuote = (symbol: string, enabled: boolean = true): UseQueryResult<Quote> => {
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => forexApi.getQuote(symbol),
    enabled,
    staleTime: API_CONFIG.CACHE_DURATION,
    refetchInterval: API_CONFIG.DEFAULT_UPDATE_INTERVAL * 60 * 1000,
  });
};

export const useForexTimeSeries = (
  symbol: string,
  timeframe: Timeframe,
  limit: number = 100,
  enabled: boolean = true
): UseQueryResult<Candle[]> => {
  return useQuery({
    queryKey: ['timeSeries', symbol, timeframe, limit],
    queryFn: () => forexApi.getTimeSeries(symbol, timeframe, limit),
    enabled,
    staleTime: API_CONFIG.CACHE_DURATION,
    refetchInterval: API_CONFIG.DEFAULT_UPDATE_INTERVAL * 60 * 1000,
  });
};

export const useMultipleQuotes = (
  symbols: string[],
  enabled: boolean = true
): UseQueryResult<Quote[]> => {
  return useQuery({
    queryKey: ['multipleQuotes', ...symbols],
    queryFn: () => forexApi.getMultipleQuotes(symbols),
    enabled,
    staleTime: API_CONFIG.CACHE_DURATION,
    refetchInterval: API_CONFIG.DEFAULT_UPDATE_INTERVAL * 60 * 1000,
  });
};
