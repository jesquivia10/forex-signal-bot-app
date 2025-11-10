import { IndicatorService } from '../indicatorService';
import { DEFAULT_USER_PREFERENCES } from '@domain/models/preferences';
import { Candle } from '@domain/models/candle';

const createCandleSeries = (start: number, increment: number, count: number): Candle[] =>
  Array.from({ length: count }, (_, index) => ({
    timestamp: new Date(Date.now() - (count - index) * 60 * 1000).toISOString(),
    open: start + increment * index,
    high: start + increment * index + 0.001,
    low: start + increment * index - 0.001,
    close: start + increment * index,
    volume: 1000 + index * 10,
  }));

describe('IndicatorService', () => {
  it('calculates SMA, EMA, RSI and Bollinger bands', () => {
    const candles = createCandleSeries(1.2, 0.0005, 60);

    const result = IndicatorService.calculateIndicatorSet(candles, DEFAULT_USER_PREFERENCES.indicatorPreferences);

    expect(result.sma20).not.toBeNull();
    expect(result.sma50).not.toBeNull();
    expect((result.sma20 ?? 0) >= (result.sma50 ?? 0)).toBe(true);
    expect((result.ema20 ?? 0) >= (result.ema50 ?? 0)).toBe(true);
    expect(result.rsi14).toBeGreaterThan(50);
    expect(result.bollinger.middle).not.toBeNull();
    expect(result.bollinger.upper).toBeGreaterThan(result.bollinger.middle ?? 0);
    expect(result.bollinger.lower).toBeLessThan(result.bollinger.middle ?? 0);
  });
});
