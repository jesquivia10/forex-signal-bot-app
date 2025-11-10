import { INDICATOR_DEFAULTS } from '../../config/constants';
import type { CandleSeries, IndicatorSnapshot } from '../entities';
import type { IndicatorParameters } from '../entities/UserSettings';

export class IndicatorEngine {
  constructor(private params: IndicatorParameters = IndicatorEngine.defaultParameters()) {}

  static defaultParameters(): IndicatorParameters {
    return {
      bollingerPeriod: INDICATOR_DEFAULTS.bollinger.period,
      bollingerStdDev: INDICATOR_DEFAULTS.bollinger.deviation,
      rsiPeriod: INDICATOR_DEFAULTS.rsi.period,
      rsiOverbought: INDICATOR_DEFAULTS.rsi.overbought,
      rsiOversold: INDICATOR_DEFAULTS.rsi.oversold,
      movingAverageFast: INDICATOR_DEFAULTS.movingAverages.smaPeriods[0],
      movingAverageSlow: INDICATOR_DEFAULTS.movingAverages.smaPeriods[1],
    };
  }

  updateParameters(next: Partial<IndicatorParameters>) {
    this.params = {
      ...this.params,
      ...next,
    };
  }

  getParameters(): IndicatorParameters {
    return { ...this.params };
  }

  buildSnapshot(series: CandleSeries): IndicatorSnapshot | null {
    if (series.length === 0) {
      return null;
    }
    const sortedSeries = [...series].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    const closes = sortedSeries.map((candle) => candle.close);
    const latestCandle = sortedSeries[sortedSeries.length - 1];
    const { bollingerPeriod, bollingerStdDev, rsiPeriod, movingAverageFast, movingAverageSlow } = this.params;

    const bollinger = this.calculateBollinger(closes, bollingerPeriod, bollingerStdDev);
    const rsi = this.calculateRSI(closes, rsiPeriod);
    const smaFast = this.calculateSMA(closes, movingAverageFast);
    const smaSlow = this.calculateSMA(closes, movingAverageSlow);
    const emaFast = this.calculateEMA(closes, movingAverageFast);
    const emaSlow = this.calculateEMA(closes, movingAverageSlow);

    if (!bollinger || rsi === null || smaFast === null || smaSlow === null || emaFast === null || emaSlow === null) {
      return null;
    }

    return {
      timestamp: latestCandle.timestamp,
      price: latestCandle.close,
      bollinger,
      rsi,
      movingAverages: {
        smaFast,
        smaSlow,
        emaFast,
        emaSlow,
      },
    };
  }

  calculateSMA(values: number[], period: number): number | null {
    if (values.length < period) {
      return null;
    }
    const relevant = values.slice(-period);
    const sum = relevant.reduce((acc, value) => acc + value, 0);
    return sum / period;
  }

  calculateEMA(values: number[], period: number): number | null {
    if (values.length < period) {
      return null;
    }
    const k = 2 / (period + 1);
    let ema = this.calculateSMA(values.slice(0, period), period);
    if (ema === null) {
      return null;
    }
    let currentEma = ema;
    for (let i = period; i < values.length; i += 1) {
      const price = values[i];
      currentEma = price * k + (currentEma as number) * (1 - k);
    }
    return currentEma;
  }

  calculateRSI(values: number[], period: number): number | null {
    if (values.length <= period) {
      return null;
    }
    let gainSum = 0;
    let lossSum = 0;

    for (let i = 1; i <= period; i += 1) {
      const delta = values[i] - values[i - 1];
      if (delta >= 0) {
        gainSum += delta;
      } else {
        lossSum += Math.abs(delta);
      }
    }

    let averageGain = gainSum / period;
    let averageLoss = lossSum / period;

    for (let i = period + 1; i < values.length; i += 1) {
      const delta = values[i] - values[i - 1];
      if (delta >= 0) {
        averageGain = (averageGain * (period - 1) + delta) / period;
        averageLoss = (averageLoss * (period - 1)) / period;
      } else {
        averageGain = (averageGain * (period - 1)) / period;
        averageLoss = (averageLoss * (period - 1) + Math.abs(delta)) / period;
      }
    }

    if (averageLoss === 0) {
      return 100;
    }

    const rs = averageGain / averageLoss;
    return 100 - 100 / (1 + rs);
  }

  calculateBollinger(values: number[], period: number, stdDevMultiplier: number) {
    if (values.length < period) {
      return null;
    }
    const relevant = values.slice(-period);
    const mean = this.calculateSMA(relevant, period);
    if (mean === null) {
      return null;
    }
    const variance = relevant.reduce((acc, value) => acc + (value - mean) ** 2, 0) / period;
    const stdDev = Math.sqrt(variance);

    return {
      middle: mean,
      upper: mean + stdDevMultiplier * stdDev,
      lower: mean - stdDevMultiplier * stdDev,
    };
  }
}
