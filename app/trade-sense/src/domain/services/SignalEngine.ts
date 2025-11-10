import { formatPair } from '../entities/CurrencyPair';
import type { CandleSeries, IndicatorSnapshot, Signal, SignalDirection } from '../entities';
import type { IndicatorParameters } from '../entities/UserSettings';
import { IndicatorEngine } from './IndicatorEngine';

type EngineConfig = {
  indicatorParameters?: IndicatorParameters;
  allowCounterTrend?: boolean;
};

export class SignalEngine {
  private readonly indicatorEngine: IndicatorEngine;
  private readonly allowCounterTrend: boolean;

  constructor(config: EngineConfig = {}) {
    this.indicatorEngine = new IndicatorEngine(config.indicatorParameters);
    this.allowCounterTrend = config.allowCounterTrend ?? false;
  }

  updateIndicatorParameters(params: Partial<IndicatorParameters>) {
    this.indicatorEngine.updateParameters(params);
  }

  generateSignals(params: { pair: { base: string; quote: string }; candles: CandleSeries }): Signal[] {
    const { pair, candles } = params;
    if (candles.length === 0) {
      return [];
    }

    const snapshot = this.indicatorEngine.buildSnapshot(candles);
    if (!snapshot) {
      return [];
    }

    const signals: Signal[] = [];
    const pairLabel = formatPair(pair);

    const buySignal = this.evaluateBuySignal(pairLabel, snapshot);
    if (buySignal) {
      signals.push(buySignal);
    }

    const sellSignal = this.evaluateSellSignal(pairLabel, snapshot);
    if (sellSignal) {
      signals.push(sellSignal);
    }

    return signals;
  }

  private evaluateBuySignal(pair: string, snapshot: IndicatorSnapshot): Signal | null {
    const { price, bollinger, rsi, movingAverages } = snapshot;
    const touchesLowerBand = price <= bollinger.lower * 1.005;
    const rsiInOversold = rsi <= this.indicatorEngine.getParameters().rsiOversold;
    const trendAligned = movingAverages.emaFast >= movingAverages.emaSlow;

    if (!touchesLowerBand || !rsiInOversold || (!trendAligned && !this.allowCounterTrend)) {
      return null;
    }

    const confidence = this.calculateConfidence('buy', snapshot, { trendAligned });
    const rationale = this.buildRationale('buy', snapshot, { touchesBand: touchesLowerBand, rsiTrigger: rsiInOversold, trendAligned });

    return this.buildSignal({
      pair,
      direction: 'buy',
      confidence,
      snapshot,
      rationale,
    });
  }

  private evaluateSellSignal(pair: string, snapshot: IndicatorSnapshot): Signal | null {
    const { price, bollinger, rsi, movingAverages } = snapshot;
    const touchesUpperBand = price >= bollinger.upper * 0.995;
    const rsiInOverbought = rsi >= this.indicatorEngine.getParameters().rsiOverbought;
    const trendAligned = movingAverages.emaFast <= movingAverages.emaSlow;

    if (!touchesUpperBand || !rsiInOverbought || (!trendAligned && !this.allowCounterTrend)) {
      return null;
    }

    const confidence = this.calculateConfidence('sell', snapshot, { trendAligned });
    const rationale = this.buildRationale('sell', snapshot, { touchesBand: touchesUpperBand, rsiTrigger: rsiInOverbought, trendAligned });

    return this.buildSignal({
      pair,
      direction: 'sell',
      confidence,
      snapshot,
      rationale,
    });
  }

  private calculateConfidence(direction: SignalDirection, snapshot: IndicatorSnapshot, context: { trendAligned: boolean }): number {
    const { price, bollinger, rsi, movingAverages } = snapshot;
    const bandRange = bollinger.upper - bollinger.lower;
    const distanceToBand =
      direction === 'buy' ? Math.abs(price - bollinger.lower) : Math.abs(price - bollinger.upper);
    const bollingerScore = Math.max(0, 1 - distanceToBand / Math.max(bandRange, 1e-6));
    const { rsiOversold, rsiOverbought } = this.indicatorEngine.getParameters();
    let rsiScore = 0;
    if (direction === 'buy') {
      rsiScore = Math.min(1, (rsiOversold - rsi) / rsiOversold);
    } else {
      rsiScore = Math.min(1, (rsi - rsiOverbought) / (100 - rsiOverbought || 1));
    }

    let maAlignment = context.trendAligned ? 1 : 0.4;
    if (!context.trendAligned) {
      const slope = movingAverages.emaFast - movingAverages.emaSlow;
      if ((direction === 'buy' && slope > 0) || (direction === 'sell' && slope < 0)) {
        maAlignment = 0.7;
      }
    }

    const confidence = 0.4 * bollingerScore + 0.4 * Math.max(0, rsiScore) + 0.2 * maAlignment;
    return Math.min(1, Math.max(0, Number(confidence.toFixed(2))));
  }

  private buildRationale(
    direction: SignalDirection,
    snapshot: IndicatorSnapshot,
    context: { touchesBand: boolean; rsiTrigger: boolean; trendAligned: boolean },
  ): string[] {
    const rationales: string[] = [];

    if (context.touchesBand) {
      rationales.push(
        direction === 'buy'
          ? 'Price respected the lower Bollinger Band with increasing volatility.'
          : 'Price touched the upper Bollinger Band indicating potential exhaustion.',
      );
    }

    if (context.rsiTrigger) {
      rationales.push(
        direction === 'buy'
          ? `RSI at ${snapshot.rsi.toFixed(1)} is below oversold threshold.`
          : `RSI at ${snapshot.rsi.toFixed(1)} is above overbought threshold.`,
      );
    }

    rationales.push(
      context.trendAligned
        ? 'Moving averages confirm the prevailing trend.'
        : 'Trend filter is less aligned; consider tighter risk management.',
    );

    return rationales;
  }

  private buildSignal(params: {
    pair: string;
    direction: SignalDirection;
    confidence: number;
    snapshot: IndicatorSnapshot;
    rationale: string[];
  }): Signal {
    const { pair, direction, confidence, snapshot, rationale } = params;
    const id = `${pair.replace('/', '-')}:${direction}:${snapshot.timestamp}`;
    return {
      id,
      pair,
      direction,
      confidence,
      rationale,
      createdAt: snapshot.timestamp,
      indicatorSnapshot: snapshot,
    };
  }
}
