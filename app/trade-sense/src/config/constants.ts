export const SUPPORTED_PAIRS = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD'] as const;

export const DEFAULT_REFRESH_INTERVAL_MINUTES = 15;

export const INDICATOR_DEFAULTS = {
  bollinger: {
    period: 20,
    deviation: 2,
  },
  rsi: {
    period: 14,
    overbought: 70,
    oversold: 30,
  },
  movingAverages: {
    smaPeriods: [20, 50] as const,
    emaPeriods: [20, 50] as const,
  },
};
