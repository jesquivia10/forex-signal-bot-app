export interface MovingAverageSet {
  period: number;
  type: 'sma' | 'ema';
  value: number | null;
}

export interface BollingerBands {
  upper: number | null;
  middle: number | null;
  lower: number | null;
}

export interface IndicatorSet {
  sma20: number | null;
  sma50: number | null;
  ema20: number | null;
  ema50: number | null;
  rsi14: number | null;
  bollinger: BollingerBands;
}
