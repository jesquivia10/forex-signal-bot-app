import { Candle } from '@types/api.types';

export interface RSIResult {
  value: number;
  condition: 'overbought' | 'oversold' | 'neutral';
}

export class RSI {
  private period: number;
  private overboughtLevel: number;
  private oversoldLevel: number;

  constructor(period: number = 14, overboughtLevel: number = 70, oversoldLevel: number = 30) {
    this.period = period;
    this.overboughtLevel = overboughtLevel;
    this.oversoldLevel = oversoldLevel;
  }

  calculate(candles: Candle[]): number[] {
    if (candles.length < this.period + 1) {
      return [];
    }

    const closePrices = candles.map((c) => c.close);
    const changes: number[] = [];
    
    // Calculate price changes
    for (let i = 1; i < closePrices.length; i++) {
      changes.push(closePrices[i] - closePrices[i - 1]);
    }

    const results: number[] = [];
    
    // Calculate first RSI using simple average
    let avgGain = 0;
    let avgLoss = 0;
    
    for (let i = 0; i < this.period; i++) {
      if (changes[i] > 0) {
        avgGain += changes[i];
      } else {
        avgLoss += Math.abs(changes[i]);
      }
    }
    
    avgGain /= this.period;
    avgLoss /= this.period;
    
    const rs = avgGain / avgLoss;
    results.push(100 - (100 / (1 + rs)));

    // Calculate subsequent RSI values using smoothed averages
    for (let i = this.period; i < changes.length; i++) {
      const change = changes[i];
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? Math.abs(change) : 0;
      
      avgGain = (avgGain * (this.period - 1) + gain) / this.period;
      avgLoss = (avgLoss * (this.period - 1) + loss) / this.period;
      
      const currentRS = avgGain / avgLoss;
      results.push(100 - (100 / (1 + currentRS)));
    }

    return results;
  }

  calculateLast(candles: Candle[]): number | null {
    const results = this.calculate(candles);
    return results.length > 0 ? results[results.length - 1] : null;
  }

  calculateLastWithCondition(candles: Candle[]): RSIResult | null {
    const value = this.calculateLast(candles);
    if (value === null) return null;

    return {
      value,
      condition: this.getCondition(value),
    };
  }

  getCondition(rsiValue: number): 'overbought' | 'oversold' | 'neutral' {
    if (rsiValue >= this.overboughtLevel) {
      return 'overbought';
    }
    if (rsiValue <= this.oversoldLevel) {
      return 'oversold';
    }
    return 'neutral';
  }

  isOverbought(rsiValue: number): boolean {
    return rsiValue >= this.overboughtLevel;
  }

  isOversold(rsiValue: number): boolean {
    return rsiValue <= this.oversoldLevel;
  }

  isDivergence(rsiValues: number[], priceValues: number[], lookback: number = 5): boolean {
    if (rsiValues.length < lookback || priceValues.length < lookback) {
      return false;
    }

    const recentRSI = rsiValues.slice(-lookback);
    const recentPrices = priceValues.slice(-lookback);

    // Bullish divergence: price making lower lows, RSI making higher lows
    const priceLowerLow = recentPrices[recentPrices.length - 1] < recentPrices[0];
    const rsiHigherLow = recentRSI[recentRSI.length - 1] > recentRSI[0];

    // Bearish divergence: price making higher highs, RSI making lower highs
    const priceHigherHigh = recentPrices[recentPrices.length - 1] > recentPrices[0];
    const rsiLowerHigh = recentRSI[recentRSI.length - 1] < recentRSI[0];

    return (priceLowerLow && rsiHigherLow) || (priceHigherHigh && rsiLowerHigh);
  }
}
