import { Candle } from '@types/api.types';
import { Signal, SignalType, ConfidenceLevel } from '@types/signal.types';
import { BollingerBands, BollingerBandsResult } from './BollingerBands';
import { RSI, RSIResult } from './RSI';
import { MovingAverage, TrendDirection } from './MovingAverage';
import { generateUUID } from '@utils/uuid';

export interface SignalGeneratorConfig {
  rsiPeriod?: number;
  rsiOverbought?: number;
  rsiOversold?: number;
  bbPeriod?: number;
  bbStdDev?: number;
  smaPeriods?: [number, number];
  emaPeriods?: [number, number];
  minConfidenceLevel?: ConfidenceLevel;
}

export class SignalGenerator {
  private rsi: RSI;
  private bb: BollingerBands;
  private ma: MovingAverage;
  private config: Required<SignalGeneratorConfig>;

  constructor(config: SignalGeneratorConfig = {}) {
    this.config = {
      rsiPeriod: config.rsiPeriod || 14,
      rsiOverbought: config.rsiOverbought || 70,
      rsiOversold: config.rsiOversold || 30,
      bbPeriod: config.bbPeriod || 20,
      bbStdDev: config.bbStdDev || 2,
      smaPeriods: config.smaPeriods || [20, 50],
      emaPeriods: config.emaPeriods || [20, 50],
      minConfidenceLevel: config.minConfidenceLevel || 'LOW',
    };

    this.rsi = new RSI(this.config.rsiPeriod, this.config.rsiOverbought, this.config.rsiOversold);
    this.bb = new BollingerBands(this.config.bbPeriod, this.config.bbStdDev);
    this.ma = new MovingAverage();
  }

  generateSignal(candles: Candle[], currencyPair: string): Signal | null {
    if (candles.length < Math.max(this.config.bbPeriod, this.config.rsiPeriod, this.config.smaPeriods[1])) {
      return null;
    }

    const currentPrice = candles[candles.length - 1].close;
    
    // Calculate indicators
    const rsiResult = this.rsi.calculateLastWithCondition(candles);
    const bbResult = this.bb.calculateLast(candles);
    const sma20 = this.ma.getLastSMA(candles, this.config.smaPeriods[0]);
    const sma50 = this.ma.getLastSMA(candles, this.config.smaPeriods[1]);
    const ema20 = this.ma.getLastEMA(candles, this.config.emaPeriods[0]);
    const ema50 = this.ma.getLastEMA(candles, this.config.emaPeriods[1]);

    if (!rsiResult || !bbResult || !sma20 || !sma50 || !ema20 || !ema50) {
      return null;
    }

    const trend = this.ma.determineTrend(sma20, sma50);
    const bbPosition = this.bb.getPricePosition(currentPrice, bbResult);

    // Evaluate signal conditions
    const buyConditions = this.evaluateBuyConditions(currentPrice, rsiResult, bbResult, bbPosition, trend);
    const sellConditions = this.evaluateSellConditions(currentPrice, rsiResult, bbResult, bbPosition, trend);

    let signalType: SignalType = 'NEUTRAL';
    let confidence: ConfidenceLevel = 'LOW';
    let reason = '';

    if (buyConditions.score > sellConditions.score && buyConditions.score > 0) {
      signalType = 'BUY';
      confidence = this.calculateConfidence(buyConditions.score);
      reason = buyConditions.reasons.join('. ');
    } else if (sellConditions.score > 0) {
      signalType = 'SELL';
      confidence = this.calculateConfidence(sellConditions.score);
      reason = sellConditions.reasons.join('. ');
    }

    // Filter by minimum confidence level
    if (!this.meetsMinConfidence(confidence)) {
      return null;
    }

    if (signalType === 'NEUTRAL') {
      return null;
    }

    return {
      id: generateUUID(),
      currencyPair,
      type: signalType,
      confidence,
      timestamp: new Date(candles[candles.length - 1].timestamp),
      price: currentPrice,
      indicators: {
        rsi: rsiResult,
        bollingerBands: {
          upper: bbResult.upper,
          middle: bbResult.middle,
          lower: bbResult.lower,
          position: bbPosition,
        },
        movingAverages: {
          sma20,
          sma50,
          ema20,
          ema50,
          trend,
        },
      },
      reason,
      metadata: {
        strength: Math.max(buyConditions.score, sellConditions.score),
        volatility: bbResult.bandwidth,
      },
    };
  }

  private evaluateBuyConditions(
    price: number,
    rsi: RSIResult,
    bb: BollingerBandsResult,
    bbPosition: 'above' | 'below' | 'inside',
    trend: TrendDirection
  ): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    // Primary condition: Price near lower BB and RSI oversold
    if (bbPosition === 'below' || this.bb.isPriceTouchingLower(price, bb, 0.002)) {
      score += 3;
      reasons.push('Price is at or below lower Bollinger Band');

      if (rsi.condition === 'oversold') {
        score += 3;
        reasons.push(`RSI is oversold (${rsi.value.toFixed(2)})`);
      }
    }

    // Secondary condition: Bullish trend confirmation
    if (trend === 'bullish') {
      score += 2;
      reasons.push('Overall trend is bullish (SMA 20 > SMA 50)');
    }

    // Additional: RSI showing strength from oversold
    if (rsi.value > 30 && rsi.value < 50) {
      score += 1;
      reasons.push('RSI recovering from oversold territory');
    }

    return { score, reasons };
  }

  private evaluateSellConditions(
    price: number,
    rsi: RSIResult,
    bb: BollingerBandsResult,
    bbPosition: 'above' | 'below' | 'inside',
    trend: TrendDirection
  ): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    // Primary condition: Price near upper BB and RSI overbought
    if (bbPosition === 'above' || this.bb.isPriceTouchingUpper(price, bb, 0.002)) {
      score += 3;
      reasons.push('Price is at or above upper Bollinger Band');

      if (rsi.condition === 'overbought') {
        score += 3;
        reasons.push(`RSI is overbought (${rsi.value.toFixed(2)})`);
      }
    }

    // Secondary condition: Bearish trend confirmation
    if (trend === 'bearish') {
      score += 2;
      reasons.push('Overall trend is bearish (SMA 20 < SMA 50)');
    }

    // Additional: RSI showing weakness from overbought
    if (rsi.value < 70 && rsi.value > 50) {
      score += 1;
      reasons.push('RSI declining from overbought territory');
    }

    return { score, reasons };
  }

  private calculateConfidence(score: number): ConfidenceLevel {
    if (score >= 7) return 'HIGH';
    if (score >= 4) return 'MEDIUM';
    return 'LOW';
  }

  private meetsMinConfidence(confidence: ConfidenceLevel): boolean {
    const levels: ConfidenceLevel[] = ['LOW', 'MEDIUM', 'HIGH'];
    const currentIndex = levels.indexOf(confidence);
    const minIndex = levels.indexOf(this.config.minConfidenceLevel);
    return currentIndex >= minIndex;
  }

  updateConfig(config: Partial<SignalGeneratorConfig>): void {
    this.config = { ...this.config, ...config };
    this.rsi = new RSI(this.config.rsiPeriod, this.config.rsiOverbought, this.config.rsiOversold);
    this.bb = new BollingerBands(this.config.bbPeriod, this.config.bbStdDev);
  }
}
