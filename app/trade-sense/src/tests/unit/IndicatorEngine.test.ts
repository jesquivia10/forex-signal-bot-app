import { IndicatorEngine } from '../../domain/services/IndicatorEngine';
import type { Candle } from '../../domain/entities';

const buildCandleSeries = (values: number[]): Candle[] =>
  values.map((value, index) => ({
    timestamp: new Date(Date.now() - index * 60_000).toISOString(),
    open: value,
    high: value + 0.5,
    low: value - 0.5,
    close: value,
  }));

describe('IndicatorEngine', () => {
  it('computes snapshot metrics for ascending data with custom parameters', () => {
    const engine = new IndicatorEngine({
      bollingerPeriod: 10,
      bollingerStdDev: 2,
      rsiPeriod: 10,
      rsiOverbought: 70,
      rsiOversold: 30,
      movingAverageFast: 5,
      movingAverageSlow: 10,
    });
    const candles = buildCandleSeries(Array.from({ length: 20 }, (_, idx) => 20 - idx));

    const snapshot = engine.buildSnapshot(candles);

    expect(snapshot).not.toBeNull();
    expect(snapshot?.price).toBeCloseTo(20);
    expect(snapshot?.movingAverages.smaFast).toBeCloseTo(18, 1);
    expect(snapshot?.movingAverages.smaSlow).toBeCloseTo(15.5, 1);
    expect(snapshot?.bollinger.middle).toBeCloseTo(15.5, 1);
    expect(snapshot?.bollinger.upper).toBeGreaterThan(snapshot!.bollinger.middle);
    expect(snapshot?.bollinger.lower).toBeLessThan(snapshot!.bollinger.middle);
    expect(snapshot?.rsi).toEqual(100);
  });

  it('returns null snapshot when insufficient candles are provided', () => {
    const engine = new IndicatorEngine();
    const candles = buildCandleSeries([1, 2, 3, 4, 5]);

    const snapshot = engine.buildSnapshot(candles);

    expect(snapshot).toBeNull();
  });
});
