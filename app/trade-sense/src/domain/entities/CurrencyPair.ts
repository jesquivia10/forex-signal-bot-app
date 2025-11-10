export type CurrencyPair = {
  base: string;
  quote: string;
};

export type CandleInterval = '1min' | '5min' | '15min' | '30min' | '60min';

export function formatPair(pair: CurrencyPair): string {
  return `${pair.base}/${pair.quote}`;
}

export function parsePair(symbol: string): CurrencyPair {
  const [base, quote] = symbol.split('/');
  if (!base || !quote) {
    throw new Error(`Invalid currency pair symbol: ${symbol}`);
  }
  return { base, quote };
}
