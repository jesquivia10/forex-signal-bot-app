export type CurrencyPairSymbol = 'EURUSD' | 'GBPUSD' | 'USDJPY' | 'AUDUSD' | 'USDCAD';

export const DEFAULT_CURRENCY_PAIRS: Record<CurrencyPairSymbol, { label: string; base: string; quote: string }> = {
  EURUSD: { label: 'EUR/USD', base: 'EUR', quote: 'USD' },
  GBPUSD: { label: 'GBP/USD', base: 'GBP', quote: 'USD' },
  USDJPY: { label: 'USD/JPY', base: 'USD', quote: 'JPY' },
  AUDUSD: { label: 'AUD/USD', base: 'AUD', quote: 'USD' },
  USDCAD: { label: 'USD/CAD', base: 'USD', quote: 'CAD' },
};

export const DEFAULT_PAIR_ORDER: CurrencyPairSymbol[] = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD'];

export const SUPPORTED_INTERVALS = ['15min', '30min', '60min'] as const;

export type CandleInterval = (typeof SUPPORTED_INTERVALS)[number];
