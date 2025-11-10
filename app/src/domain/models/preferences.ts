import { CandleInterval, CurrencyPairSymbol } from '@config/tradingPairs';

export interface IndicatorPreferences {
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  smaPeriodShort: number;
  smaPeriodLong: number;
  emaPeriodShort: number;
  emaPeriodLong: number;
  bollingerPeriod: number;
  bollingerStdDev: number;
}

export interface NotificationPreferences {
  enabled: boolean;
  intervalMinutes: CandleInterval;
  pushNotifications: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  monitoredPairs: CurrencyPairSymbol[];
  indicatorPreferences: IndicatorPreferences;
  notifications: NotificationPreferences;
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: 'system',
  monitoredPairs: ['EURUSD', 'GBPUSD', 'USDJPY'],
  indicatorPreferences: {
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    smaPeriodShort: 20,
    smaPeriodLong: 50,
    emaPeriodShort: 20,
    emaPeriodLong: 50,
    bollingerPeriod: 20,
    bollingerStdDev: 2,
  },
  notifications: {
    enabled: true,
    intervalMinutes: '15min',
    pushNotifications: true,
  },
};
