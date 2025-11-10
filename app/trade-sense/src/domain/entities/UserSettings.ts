import type { CandleInterval } from './CurrencyPair';

export type IndicatorParameters = {
  bollingerPeriod: number;
  bollingerStdDev: number;
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  movingAverageFast: number;
  movingAverageSlow: number;
};

export type NotificationPreference = {
  enabled: boolean;
  intervalMinutes: number;
};

export type UserSettings = {
  preferredPairs: string[];
  indicatorParameters: IndicatorParameters;
  notificationPreference: NotificationPreference;
  autoRefreshInterval: CandleInterval;
};
