import { Candle } from '@domain/models/candle';
import { IndicatorPreferences, UserPreferences } from '@domain/models/preferences';
import { Signal, SignalConfidence, SignalDirection } from '@domain/models/signal';
import { IndicatorSet } from '@domain/models/technicals';
import { IndicatorService } from '@domain/services/indicatorService';

const buildRationale = ({
  direction,
  indicators,
  price,
  prefs,
}: {
  direction: SignalDirection;
  indicators: IndicatorSet;
  price: number;
  prefs: IndicatorPreferences;
}): string[] => {
  const messages: string[] = [];
  if (direction === 'buy') {
    messages.push(`El precio actual (${price.toFixed(4)}) se acerca a la banda inferior de Bollinger.`);
    if (indicators.rsi14 !== null) {
      messages.push(
        `RSI (${indicators.rsi14}) por debajo del umbral de sobreventa (${prefs.rsiOversold}).`,
      );
    }
  } else if (direction === 'sell') {
    messages.push(`El precio actual (${price.toFixed(4)}) se acerca a la banda superior de Bollinger.`);
    if (indicators.rsi14 !== null) {
      messages.push(
        `RSI (${indicators.rsi14}) por encima del umbral de sobrecompra (${prefs.rsiOverbought}).`,
      );
    }
  }

  if (indicators.sma20 && indicators.sma50) {
    messages.push(`SMA20 (${indicators.sma20}) vs SMA50 (${indicators.sma50}) indicando tendencia.`);
  }
  if (indicators.ema20 && indicators.ema50) {
    messages.push(`EMA20 (${indicators.ema20}) vs EMA50 (${indicators.ema50}) confirmando impulso.`);
  }
  return messages;
};

const evaluateConfidence = (
  direction: SignalDirection,
  indicators: IndicatorSet,
  prefs: IndicatorPreferences,
): SignalConfidence => {
  let score = 0;

  if (indicators.rsi14 !== null) {
    if (direction === 'buy' && indicators.rsi14 <= prefs.rsiOversold + 5) score += 1;
    if (direction === 'sell' && indicators.rsi14 >= prefs.rsiOverbought - 5) score += 1;
  }

  if (indicators.sma20 && indicators.sma50) {
    const trendingUp = indicators.sma20 > indicators.sma50;
    if ((direction === 'buy' && trendingUp) || (direction === 'sell' && !trendingUp)) score += 1;
  }

  if (indicators.ema20 && indicators.ema50) {
    const trendingUp = indicators.ema20 > indicators.ema50;
    if ((direction === 'buy' && trendingUp) || (direction === 'sell' && !trendingUp)) score += 1;
  }

  if (score >= 3) return 'high';
  if (score === 2) return 'medium';
  return 'low';
};

const shouldEmitSignal = (
  direction: SignalDirection,
  candle: Candle,
  indicators: IndicatorSet,
  prefs: IndicatorPreferences,
): boolean => {
  if (!indicators.bollinger.lower || !indicators.bollinger.upper) return false;
  if (direction === 'buy') {
    const touchedLower =
      candle.close <= (indicators.bollinger.lower ?? Number.NEGATIVE_INFINITY) * 1.005;
    const rsiOk =
      indicators.rsi14 !== null ? indicators.rsi14 <= prefs.rsiOversold : false;
    return touchedLower && rsiOk;
  }
  const touchedUpper =
    candle.close >= (indicators.bollinger.upper ?? Number.POSITIVE_INFINITY) * 0.995;
  const rsiOk = indicators.rsi14 !== null ? indicators.rsi14 >= prefs.rsiOverbought : false;
  return touchedUpper && rsiOk;
};

const buildSignal = (
  pair: string,
  direction: SignalDirection,
  indicators: IndicatorSet,
  price: number,
  prefs: IndicatorPreferences,
): Signal => {
  const id = `${pair}-${direction}-${Date.now()}-${Math.round(price * 10000)}`;
  return {
    id,
    pair,
    direction,
    confidence: evaluateConfidence(direction, indicators, prefs),
    createdAt: new Date().toISOString(),
    price,
    rationale: buildRationale({ direction, indicators, price, prefs }),
    indicators,
  };
};

export const generateSignalsForPair = (
  pair: string,
  candles: Candle[],
  preferences: UserPreferences,
): { signal: Signal | null; indicators: IndicatorSet } => {
  if (!candles.length) {
    return {
      signal: null,
      indicators: {
        bollinger: { lower: null, middle: null, upper: null },
        ema20: null,
        ema50: null,
        rsi14: null,
        sma20: null,
        sma50: null,
      },
    };
  }

  const indicators = IndicatorService.calculateIndicatorSet(candles, preferences.indicatorPreferences);
  const latestCandle = candles[0];

  const possibleSignals: Array<Signal | null> = [
    shouldEmitSignal('buy', latestCandle, indicators, preferences.indicatorPreferences)
      ? buildSignal(pair, 'buy', indicators, latestCandle.close, preferences.indicatorPreferences)
      : null,
    shouldEmitSignal('sell', latestCandle, indicators, preferences.indicatorPreferences)
      ? buildSignal(pair, 'sell', indicators, latestCandle.close, preferences.indicatorPreferences)
      : null,
  ];

  const signal = possibleSignals.find((candidate) => candidate !== null) ?? null;

  return {
    signal,
    indicators,
  };
};
