import { Candle } from '@types/api.types';

export interface BollingerBandsResult {
  upper: number;
  middle: number;
  lower: number;
  bandwidth: number;
}

export class BollingerBands {
  private period: number;
  private standardDeviations: number;

  constructor(period: number = 20, standardDeviations: number = 2) {
    this.period = period;
    this.standardDeviations = standardDeviations;
  }

  calculate(candles: Candle[]): BollingerBandsResult[] {
    if (candles.length < this.period) {
      return [];
    }

    const results: BollingerBandsResult[] = [];
    const closePrices = candles.map((c) => c.close);

    for (let i = this.period - 1; i < closePrices.length; i++) {
      const slice = closePrices.slice(i - this.period + 1, i + 1);
      const middle = this.calculateSMA(slice);
      const stdDev = this.calculateStandardDeviation(slice, middle);
      
      const upper = middle + this.standardDeviations * stdDev;
      const lower = middle - this.standardDeviations * stdDev;
      const bandwidth = ((upper - lower) / middle) * 100;

      results.push({
        upper,
        middle,
        lower,
        bandwidth,
      });
    }

    return results;
  }

  calculateLast(candles: Candle[]): BollingerBandsResult | null {
    const results = this.calculate(candles);
    return results.length > 0 ? results[results.length - 1] : null;
  }

  private calculateSMA(values: number[]): number {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  private calculateStandardDeviation(values: number[], mean: number): number {
    const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
    return Math.sqrt(variance);
  }

  isPriceTouchingUpper(price: number, bands: BollingerBandsResult, threshold: number = 0.001): boolean {
    return Math.abs(price - bands.upper) / bands.upper < threshold;
  }

  isPriceTouchingLower(price: number, bands: BollingerBandsResult, threshold: number = 0.001): boolean {
    return Math.abs(price - bands.lower) / bands.lower < threshold;
  }

  getPricePosition(price: number, bands: BollingerBandsResult): 'above' | 'below' | 'inside' {
    if (price > bands.upper) return 'above';
    if (price < bands.lower) return 'below';
    return 'inside';
  }
}
