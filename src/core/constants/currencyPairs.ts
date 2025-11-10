import { CurrencyPair } from '../entities/CurrencyPair';

export const MAJOR_PAIRS: CurrencyPair[] = [
  {
    symbol: 'EURUSD',
    base: 'EUR',
    quote: 'USD',
    name: 'Euro / US Dollar',
    isActive: true,
    minPipValue: 0.0001,
  },
  {
    symbol: 'GBPUSD',
    base: 'GBP',
    quote: 'USD',
    name: 'British Pound / US Dollar',
    isActive: true,
    minPipValue: 0.0001,
  },
  {
    symbol: 'USDJPY',
    base: 'USD',
    quote: 'JPY',
    name: 'US Dollar / Japanese Yen',
    isActive: true,
    minPipValue: 0.01,
  },
  {
    symbol: 'USDCHF',
    base: 'USD',
    quote: 'CHF',
    name: 'US Dollar / Swiss Franc',
    isActive: true,
    minPipValue: 0.0001,
  },
  {
    symbol: 'AUDUSD',
    base: 'AUD',
    quote: 'USD',
    name: 'Australian Dollar / US Dollar',
    isActive: true,
    minPipValue: 0.0001,
  },
  {
    symbol: 'USDCAD',
    base: 'USD',
    quote: 'CAD',
    name: 'US Dollar / Canadian Dollar',
    isActive: true,
    minPipValue: 0.0001,
  },
  {
    symbol: 'NZDUSD',
    base: 'NZD',
    quote: 'USD',
    name: 'New Zealand Dollar / US Dollar',
    isActive: true,
    minPipValue: 0.0001,
  },
];

export const CROSS_PAIRS: CurrencyPair[] = [
  {
    symbol: 'EURGBP',
    base: 'EUR',
    quote: 'GBP',
    name: 'Euro / British Pound',
    isActive: true,
    minPipValue: 0.0001,
  },
  {
    symbol: 'EURJPY',
    base: 'EUR',
    quote: 'JPY',
    name: 'Euro / Japanese Yen',
    isActive: true,
    minPipValue: 0.01,
  },
  {
    symbol: 'GBPJPY',
    base: 'GBP',
    quote: 'JPY',
    name: 'British Pound / Japanese Yen',
    isActive: true,
    minPipValue: 0.01,
  },
];

export const ALL_PAIRS = [...MAJOR_PAIRS, ...CROSS_PAIRS];

export const DEFAULT_PAIRS = MAJOR_PAIRS.slice(0, 4); // EUR/USD, GBP/USD, USD/JPY, USD/CHF
