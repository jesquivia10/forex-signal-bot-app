import { Candle } from '@domain/models/candle';
import { IndicatorPreferences } from '@domain/models/preferences';
import { IndicatorSet } from '@domain/models/technicals';

const toFixedNumber = (value: number, decimals = 4) =>
  Number.isFinite(value) ? Number(value.toFixed(decimals)) : null;

const calculateSMA = (candles: Candle[], period: number): number | null => {
  if (candles.length < period) return null;
  const slice = candles.slice(-period);
  const sum = slice.reduce((acc, candle) => acc + candle.close, 0);
  return toFixedNumber(sum / period);
};

const calculateEMA = (candles: Candle[], period: number): number | null => {
  if (candles.length < period) return null;
  const k = 2 / (period + 1);
  const closes = candles.map((candle) => candle.close);
  let ema = closes.slice(0, period).reduce((acc, value) => acc + value, 0) / period;
  for (let i = period; i < closes.length; i += 1) {
    ema = closes[i] * k + ema * (1 - k);
  }
  return toFixedNumber(ema);
};

const calculateStdDeviation = (values: number[]): number => {
  if (values.length === 0) return 0;
  const mean = values.reduce((acc, curr) => acc + curr, 0) / values.length;
  const variance =
    values.reduce((acc, curr) => acc + (curr - mean) ** 2, 0) / Math.max(values.length - 1, 1);
  return Math.sqrt(variance);
};

const calculateBollinger = (candles: Candle[], period: number, stdDev: number) => {
  if (candles.length < period) {
    return { middle: null, upper: null, lower: null };
  }
  const slice = candles.slice(-period);
  const closingPrices = slice.map((candle) => candle.close);
  const middle = closingPrices.reduce((acc, curr) => acc + curr, 0) / period;
  const deviation = calculateStdDeviation(closingPrices);
  return {
    middle: toFixedNumber(middle),
    upper: toFixedNumber(middle + deviation * stdDev),
    lower: toFixedNumber(middle - deviation * stdDev),
  };
};

const calculateRSI = (candles: Candle[], period: number): number | null => {
  if (candles.length <= period) return null;
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i += 1) {
    const delta = candles[i].close - candles[i - 1].close;
    if (delta > 0) gains += delta;
    else losses -= delta;
  }

  gains /= period;
  losses /= period;

  for (let i = period + 1; i < candles.length; i += 1) {
    const delta = candles[i].close - candles[i - 1].close;
    if (delta > 0) {
      gains = (gains * (period - 1) + delta) / period;
      losses = (losses * (period - 1)) / period;
    } else {
      gains = (gains * (period - 1)) / period;
      losses = (losses * (period - 1) - delta) / period;
    }
  }

  if (losses === 0) return 100;
  const rs = gains / losses;
  return toFixedNumber(100 - 100 / (1 + rs), 2);
};

export const IndicatorService = {
  calculateIndicatorSet(candles: Candle[], preferences: IndicatorPreferences): IndicatorSet {
    const orderedByRecent = [...candles].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    return {
      sma20: calculateSMA(orderedByRecent, preferences.smaPeriodShort),
      sma50: calculateSMA(orderedByRecent, preferences.smaPeriodLong),
      ema20: calculateEMA(orderedByRecent, preferences.emaPeriodShort),
      ema50: calculateEMA(orderedByRecent, preferences.emaPeriodLong),
      rsi14: calculateRSI(orderedByRecent, preferences.rsiPeriod),
      bollinger: calculateBollinger(
        orderedByRecent,
        preferences.bollingerPeriod,
        preferences.bollingerStdDev,
      ),
    };
  },
};

export type IndicatorServiceType = typeof IndicatorService;
