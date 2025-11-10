import 'dart:math';
import 'package:tradesense/data/models/price_data.dart';

class BollingerBandsService {
  static IndicatorData calculateBollingerBands(
    List<PriceData> prices,
    int periods,
    double stdDev,
  ) {
    if (prices.length < periods) {
      return const IndicatorData();
    }
    
    final recentPrices = prices.sublist(prices.length - periods);
    final closes = recentPrices.map((p) => p.close).toList();
    
    // Calculate SMA (middle band)
    final sma = closes.reduce((a, b) => a + b) / periods;
    
    // Calculate standard deviation
    final variance = closes
        .map((price) => pow(price - sma, 2))
        .reduce((a, b) => a + b) / periods;
    final standardDeviation = sqrt(variance);
    
    // Calculate bands
    final upperBand = sma + (stdDev * standardDeviation);
    final lowerBand = sma - (stdDev * standardDeviation);
    
    return IndicatorData(
      bollingerUpper: upperBand,
      bollingerMiddle: sma,
      bollingerLower: lowerBand,
    );
  }
}
