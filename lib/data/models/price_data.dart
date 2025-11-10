import 'package:equatable/equatable.dart';

class CurrencyPair extends Equatable {
  final String symbol;
  final String name;
  
  const CurrencyPair({
    required this.symbol,
    required this.name,
  });
  
  @override
  List<Object?> get props => [symbol, name];
}

class PriceData extends Equatable {
  final DateTime timestamp;
  final double open;
  final double high;
  final double low;
  final double close;
  final double? volume;
  
  const PriceData({
    required this.timestamp,
    required this.open,
    required this.high,
    required this.low,
    required this.close,
    this.volume,
  });
  
  @override
  List<Object?> get props => [timestamp, open, high, low, close, volume];
}

class IndicatorData extends Equatable {
  final double? bollingerUpper;
  final double? bollingerMiddle;
  final double? bollingerLower;
  final double? rsi;
  final double? sma20;
  final double? sma50;
  final double? ema20;
  final double? ema50;
  
  const IndicatorData({
    this.bollingerUpper,
    this.bollingerMiddle,
    this.bollingerLower,
    this.rsi,
    this.sma20,
    this.sma50,
    this.ema20,
    this.ema50,
  });
  
  @override
  List<Object?> get props => [
    bollingerUpper,
    bollingerMiddle,
    bollingerLower,
    rsi,
    sma20,
    sma50,
    ema20,
    ema50,
  ];
}

