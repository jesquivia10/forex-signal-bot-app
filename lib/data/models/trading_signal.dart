import 'package:equatable/equatable.dart';
import 'price_data.dart';

enum SignalType { buy, sell }

enum ConfidenceLevel { low, medium, high }

class TradingSignal extends Equatable {
  final String id;
  final String pairSymbol;
  final SignalType type;
  final ConfidenceLevel confidence;
  final DateTime timestamp;
  final double currentPrice;
  final IndicatorData indicators;
  final String reason;
  
  const TradingSignal({
    required this.id,
    required this.pairSymbol,
    required this.type,
    required this.confidence,
    required this.timestamp,
    required this.currentPrice,
    required this.indicators,
    required this.reason,
  });
  
  @override
  List<Object?> get props => [
    id,
    pairSymbol,
    type,
    confidence,
    timestamp,
    currentPrice,
    indicators,
    reason,
  ];
}
