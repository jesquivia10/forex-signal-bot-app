import { Candle } from '@domain/models/candle';

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const deriveBasePrice = (pair: string): number => {
  switch (pair) {
    case 'EURUSD':
      return 1.08;
    case 'GBPUSD':
      return 1.26;
    case 'USDJPY':
      return 150.5;
    case 'AUDUSD':
      return 0.67;
    case 'USDCAD':
      return 1.35;
    default:
      return 1.0;
  }
};

export const generateMockCandles = (pair: string, points = 120): Candle[] => {
  const basePrice = deriveBasePrice(pair);
  const candles: Candle[] = [];

  let currentPrice = basePrice;
  for (let i = 0; i < points; i += 1) {
    const timestamp = new Date(Date.now() - i * 15 * 60 * 1000);
    const drift = randomBetween(-0.002, 0.002);
    const volatility = randomBetween(0.0005, 0.003);
    const close = Math.max(0.0001, currentPrice + drift);
    const high = close + volatility;
    const low = close - volatility;
    const open = currentPrice;
    const volume = randomBetween(1000, 5000);

    candles.push({
      timestamp: timestamp.toISOString(),
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
  }

  return candles;
};
