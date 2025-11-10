import 'package:uuid/uuid.dart';
import 'package:tradesense/data/models/price_data.dart';
import 'package:tradesense/data/models/trading_signal.dart';
import 'package:tradesense/core/constants/app_constants.dart';

class SignalGenerator {
  final Uuid _uuid = const Uuid();
  
  TradingSignal? generateSignal(
    String pairSymbol,
    List<PriceData> prices,
    IndicatorData indicators, {
    double rsiOversold = AppConstants.defaultRSIOversold,
    double rsiOverbought = AppConstants.defaultRSIOverbought,
  }) {
    if (prices.isEmpty) return null;
    
    final currentPrice = prices.last.close;
    final rsi = indicators.rsi;
    final bollingerUpper = indicators.bollingerUpper;
    final bollingerLower = indicators.bollingerLower;
    final ema20 = indicators.ema20;
    final ema50 = indicators.ema50;
    final sma50 = indicators.sma50;
    
    if (rsi == null || bollingerUpper == null || bollingerLower == null) {
      return null;
    }
    
    // Check for buy signal
    final buySignal = _checkBuySignal(
      currentPrice,
      rsi,
      bollingerLower,
      ema20,
      ema50,
      sma50,
      rsiOversold,
    );
    
    if (buySignal != null) {
      return TradingSignal(
        id: _uuid.v4(),
        pairSymbol: pairSymbol,
        type: SignalType.buy,
        confidence: buySignal['confidence'] as ConfidenceLevel,
        timestamp: DateTime.now(),
        currentPrice: currentPrice,
        indicators: indicators,
        reason: buySignal['reason'] as String,
      );
    }
    
    // Check for sell signal
    final sellSignal = _checkSellSignal(
      currentPrice,
      rsi,
      bollingerUpper,
      ema20,
      ema50,
      sma50,
      rsiOverbought,
    );
    
    if (sellSignal != null) {
      return TradingSignal(
        id: _uuid.v4(),
        pairSymbol: pairSymbol,
        type: SignalType.sell,
        confidence: sellSignal['confidence'] as ConfidenceLevel,
        timestamp: DateTime.now(),
        currentPrice: currentPrice,
        indicators: indicators,
        reason: sellSignal['reason'] as String,
      );
    }
    
    return null;
  }
  
  Map<String, dynamic>? _checkBuySignal(
    double currentPrice,
    double rsi,
    double bollingerLower,
    double? ema20,
    double? ema50,
    double? sma50,
    double rsiOversold,
  ) {
    // Check basic conditions: price touches lower band and RSI oversold
    final touchesLowerBand = currentPrice <= bollingerLower * 1.001; // Small tolerance
    final isOversold = rsi < rsiOversold;
    
    if (!touchesLowerBand || !isOversold) {
      return null;
    }
    
    // Check confirmations
    final hasEmaConfirmation = ema20 != null && ema50 != null && ema20 > ema50;
    final hasSmaConfirmation = sma50 != null && currentPrice > sma50;
    
    int confirmations = 0;
    final reasons = <String>[];
    
    reasons.add('Precio toca banda inferior de Bollinger');
    reasons.add('RSI en zona de sobreventa ($rsi.toStringAsFixed(1))');
    
    if (hasEmaConfirmation) {
      confirmations++;
      reasons.add('EMA20 > EMA50 (tendencia alcista)');
    }
    
    if (hasSmaConfirmation) {
      confirmations++;
      reasons.add('Precio por encima de SMA50');
    }
    
    ConfidenceLevel confidence;
    if (confirmations >= 2) {
      confidence = ConfidenceLevel.high;
    } else if (confirmations == 1) {
      confidence = ConfidenceLevel.medium;
    } else {
      confidence = ConfidenceLevel.low;
    }
    
    return {
      'confidence': confidence,
      'reason': reasons.join('\n'),
    };
  }
  
  Map<String, dynamic>? _checkSellSignal(
    double currentPrice,
    double rsi,
    double bollingerUpper,
    double? ema20,
    double? ema50,
    double? sma50,
    double rsiOverbought,
  ) {
    // Check basic conditions: price touches upper band and RSI overbought
    final touchesUpperBand = currentPrice >= bollingerUpper * 0.999; // Small tolerance
    final isOverbought = rsi > rsiOverbought;
    
    if (!touchesUpperBand || !isOverbought) {
      return null;
    }
    
    // Check confirmations
    final hasEmaConfirmation = ema20 != null && ema50 != null && ema20 < ema50;
    final hasSmaConfirmation = sma50 != null && currentPrice < sma50;
    
    int confirmations = 0;
    final reasons = <String>[];
    
    reasons.add('Precio toca banda superior de Bollinger');
    reasons.add('RSI en zona de sobrecompra ($rsi.toStringAsFixed(1))');
    
    if (hasEmaConfirmation) {
      confirmations++;
      reasons.add('EMA20 < EMA50 (tendencia bajista)');
    }
    
    if (hasSmaConfirmation) {
      confirmations++;
      reasons.add('Precio por debajo de SMA50');
    }
    
    ConfidenceLevel confidence;
    if (confirmations >= 2) {
      confidence = ConfidenceLevel.high;
    } else if (confirmations == 1) {
      confidence = ConfidenceLevel.medium;
    } else {
      confidence = ConfidenceLevel.low;
    }
    
    return {
      'confidence': confidence,
      'reason': reasons.join('\n'),
    };
  }
}
