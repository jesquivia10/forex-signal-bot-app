import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type { CandleInterval, CandleSeries } from '../../domain/entities';
import type { AlphaVantageIntradayResponse } from '../api/alphaVantageTypes';

const SERIES_KEY_BY_INTERVAL: Record<CandleInterval, keyof AlphaVantageIntradayResponse> = {
  '1min': 'Time Series FX (1min)',
  '5min': 'Time Series FX (5min)',
  '15min': 'Time Series FX (15min)',
  '30min': 'Time Series FX (30min)',
  '60min': 'Time Series FX (60min)',
};

export function mapAlphaVantageIntraday(
  response: AlphaVantageIntradayResponse,
  interval: CandleInterval,
): CandleSeries {
  const seriesKey = SERIES_KEY_BY_INTERVAL[interval];
  const raw = response[seriesKey];

  if (!raw) {
    return [];
  }

  return Object.entries(raw)
    .map(([timestamp, quote]) => ({
      timestamp: dayjs.utc(timestamp).toISOString(),
      open: Number.parseFloat(quote['1. open']),
      high: Number.parseFloat(quote['2. high']),
      low: Number.parseFloat(quote['3. low']),
      close: Number.parseFloat(quote['4. close']),
    }))
    .filter((candle) => Number.isFinite(candle.open) && Number.isFinite(candle.close))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

dayjs.extend(utc);
