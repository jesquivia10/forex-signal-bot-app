// API Configuration
export const API_CONFIG = {
  ALPHA_VANTAGE: {
    BASE_URL: 'https://www.alphavantage.co/query',
    // For development, use demo key. In production, use environment variable
    API_KEY: process.env.ALPHA_VANTAGE_API_KEY || 'demo',
    RATE_LIMIT: 5, // requests per minute
  },
  DEFAULT_UPDATE_INTERVAL: 15, // minutes
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes in milliseconds
  REQUEST_TIMEOUT: 10000, // 10 seconds
};

export const APP_CONFIG = {
  DEFAULT_TIMEFRAME: '15min' as const,
  DEFAULT_RSI_PERIOD: 14,
  DEFAULT_RSI_OVERBOUGHT: 70,
  DEFAULT_RSI_OVERSOLD: 30,
  DEFAULT_BB_PERIOD: 20,
  DEFAULT_BB_STD_DEV: 2,
  DEFAULT_SMA_PERIODS: [20, 50] as [number, number],
  DEFAULT_EMA_PERIODS: [20, 50] as [number, number],
  MAX_SIGNAL_HISTORY: 100,
  SIGNAL_EXPIRY_HOURS: 24,
};
