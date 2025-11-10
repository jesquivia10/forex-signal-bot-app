import { Timeframe } from '@types/signal.types';

export const TIMEFRAMES: { value: Timeframe; label: string; minutes: number }[] = [
  { value: '1min', label: '1 Minute', minutes: 1 },
  { value: '5min', label: '5 Minutes', minutes: 5 },
  { value: '15min', label: '15 Minutes', minutes: 15 },
  { value: '30min', label: '30 Minutes', minutes: 30 },
  { value: '1h', label: '1 Hour', minutes: 60 },
  { value: '4h', label: '4 Hours', minutes: 240 },
  { value: '1D', label: '1 Day', minutes: 1440 },
];

export const DEFAULT_TIMEFRAME: Timeframe = '15min';

export const getTimeframeMinutes = (timeframe: Timeframe): number => {
  return TIMEFRAMES.find((tf) => tf.value === timeframe)?.minutes || 15;
};

export const getTimeframeLabel = (timeframe: Timeframe): string => {
  return TIMEFRAMES.find((tf) => tf.value === timeframe)?.label || '15 Minutes';
};
