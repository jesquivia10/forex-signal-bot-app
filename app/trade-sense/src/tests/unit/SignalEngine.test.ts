import { SignalEngine } from '../../domain/services/SignalEngine';
import type { Candle, IndicatorSnapshot } from '../../domain/entities';

const buildCandles = (length: number): Candle[] =>
  Array.from({ length }, (_, index) => ({
    timestamp: new Date(Date.now() - index * 60_000).toISOString(),
    open: 1,
    high: 1,
    low: 1,
    close: 1,
  }));

const indicatorParameters = {
  bollingerPeriod: 5,
  bollingerStdDev: 2,
  rsiPeriod: 5,
  rsiOverbought: 70,
  rsiOversold: 30,
  movingAverageFast: 5,
  movingAverageSlow: 8,
} as const;

describe('SignalEngine', () => {
  const pair = { base: 'EUR', quote: 'USD' } as const;

  it('detects a potential buy signal when price touches lower band with oversold RSI', () => {
    const engine = new SignalEngine({ indicatorParameters });
    const snapshot: IndicatorSnapshot = {
      timestamp: new Date().toISOString(),
      price: 0.77,
      bollinger: { upper: 1.2, middle: 1.0, lower: 0.78 },
      rsi: 20,
      movingAverages: { emaFast: 1.02, emaSlow: 0.98, smaFast: 1.02, smaSlow: 0.99 },
    };
    (engine as any).indicatorEngine = {
      buildSnapshot: () => snapshot,
      getParameters: () => indicatorParameters,
    };

    const signals = engine.generateSignals({ pair, candles: buildCandles(10) });

    const buySignal = signals.find((signal) => signal.direction === 'buy');
    expect(buySignal).toBeDefined();
    expect(buySignal?.confidence).toBeGreaterThan(0);
    expect(buySignal?.indicatorSnapshot.rsi).toBeLessThanOrEqual(indicatorParameters.rsiOversold);
  });

  it('detects a potential sell signal when price touches upper band with overbought RSI', () => {
    const engine = new SignalEngine({ indicatorParameters });
    const snapshot: IndicatorSnapshot = {
      timestamp: new Date().toISOString(),
      price: 1.27,
      bollinger: { upper: 1.25, middle: 1.1, lower: 0.95 },
      rsi: 85,
      movingAverages: { emaFast: 1.05, emaSlow: 1.15, smaFast: 1.05, smaSlow: 1.12 },
    };
    (engine as any).indicatorEngine = {
      buildSnapshot: () => snapshot,
      getParameters: () => indicatorParameters,
    };

    const signals = engine.generateSignals({ pair, candles: buildCandles(10) });

    const sellSignal = signals.find((signal) => signal.direction === 'sell');
    expect(sellSignal).toBeDefined();
    expect(sellSignal?.confidence).toBeGreaterThan(0);
    expect(sellSignal?.indicatorSnapshot.rsi).toBeGreaterThanOrEqual(indicatorParameters.rsiOverbought);
  });
});
