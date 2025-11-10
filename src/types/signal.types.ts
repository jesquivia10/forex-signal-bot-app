export type SignalType = 'BUY' | 'SELL' | 'NEUTRAL';
export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Timeframe = '1min' | '5min' | '15min' | '30min' | '1h' | '4h' | '1D';

export interface Signal {
  id: string;
  currencyPair: string;
  type: SignalType;
  confidence: ConfidenceLevel;
  timestamp: Date;
  price: number;
  indicators: SignalIndicators;
  reason: string;
  metadata?: SignalMetadata;
}

export interface SignalIndicators {
  rsi: {
    value: number;
    condition: 'overbought' | 'oversold' | 'neutral';
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
    position: 'above' | 'below' | 'inside';
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    ema20: number;
    ema50: number;
    trend: 'bullish' | 'bearish' | 'neutral';
  };
}

export interface SignalMetadata {
  volume?: number;
  volatility?: number;
  strength?: number;
}

export interface SignalHistory {
  signal: Signal;
  outcome?: 'profit' | 'loss' | 'neutral';
  closedAt?: Date;
  pips?: number;
}
