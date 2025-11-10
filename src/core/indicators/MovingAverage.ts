import { Candle } from '@types/api.types';

export type TrendDirection = 'bullish' | 'bearish' | 'neutral';

export interface MovingAverageResult {
  sma: number;
  ema: number;
}

export class MovingAverage {
  calculateSMA(values: number[], period: number): number[] {
    if (values.length < period) {
      return [];
    }

    const results: number[] = [];

    for (let i = period - 1; i < values.length; i++) {
      const slice = values.slice(i - period + 1, i + 1);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      results.push(sum / period);
    }

    return results;
  }

  calculateEMA(values: number[], period: number): number[] {
    if (values.length < period) {
      return [];
    }

    const k = 2 / (period + 1);
    const results: number[] = [];

    // First EMA is SMA
    const firstSMA = values.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
    results.push(firstSMA);

    // Calculate subsequent EMAs
    for (let i = period; i < values.length; i++) {
      const ema = values[i] * k + results[results.length - 1] * (1 - k);
      results.push(ema);
    }

    return results;
  }

  calculateMultipleSMA(candles: Candle[], periods: number[]): Map<number, number[]> {
    const closePrices = candles.map((c) => c.close);
    const results = new Map<number, number[]>();

    periods.forEach((period) => {
      results.set(period, this.calculateSMA(closePrices, period));
    });

    return results;
  }

  calculateMultipleEMA(candles: Candle[], periods: number[]): Map<number, number[]> {
    const closePrices = candles.map((c) => c.close);
    const results = new Map<number, number[]>();

    periods.forEach((period) => {
      results.set(period, this.calculateEMA(closePrices, period));
    });

    return results;
  }

  getLastSMA(candles: Candle[], period: number): number | null {
    const closePrices = candles.map((c) => c.close);
    const sma = this.calculateSMA(closePrices, period);
    return sma.length > 0 ? sma[sma.length - 1] : null;
  }

  getLastEMA(candles: Candle[], period: number): number | null {
    const closePrices = candles.map((c) => c.close);
    const ema = this.calculateEMA(closePrices, period);
    return ema.length > 0 ? ema[ema.length - 1] : null;
  }

  determineTrend(shortMA: number, longMA: number, tolerance: number = 0.0005): TrendDirection {
    const diff = shortMA - longMA;
    const percentDiff = Math.abs(diff / longMA);

    if (percentDiff < tolerance) {
      return 'neutral';
    }

    return diff > 0 ? 'bullish' : 'bearish';
  }

  isCrossover(current: { short: number; long: number }, previous: { short: number; long: number }): 'golden' | 'death' | null {
    // Golden cross: short MA crosses above long MA
    if (previous.short <= previous.long && current.short > current.long) {
      return 'golden';
    }
    
    // Death cross: short MA crosses below long MA
    if (previous.short >= previous.long && current.short < current.long) {
      return 'death';
    }

    return null;
  }

  isPriceAboveMA(price: number, ma: number): boolean {
    return price > ma;
  }

  getMAStrength(price: number, mas: number[]): number {
    // Calculate how many MAs price is above (bullish) or below (bearish)
    const aboveCount = mas.filter((ma) => price > ma).length;
    const strength = (aboveCount / mas.length) * 100;
    return price > mas[0] ? strength : -strength;
  }

  getMASeparation(shortMA: number, longMA: number): number {
    // Returns percentage separation between MAs
    return ((shortMA - longMA) / longMA) * 100;
  }
}
