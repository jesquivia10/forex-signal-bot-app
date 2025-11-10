import 'dart:math';
import 'package:tradesense/data/models/price_data.dart';

class RSIService {
  static double? calculateRSI(List<PriceData> prices, int periods) {
    if (prices.length < periods + 1) {
      return null;
    }
    
    final changes = <double>[];
    for (int i = 1; i < prices.length; i++) {
      changes.add(prices[i].close - prices[i - 1].close);
    }
    
    if (changes.length < periods) {
      return null;
    }
    
    // Calculate initial average gain and loss
    double avgGain = 0;
    double avgLoss = 0;
    
    for (int i = 0; i < periods; i++) {
      if (changes[i] > 0) {
        avgGain += changes[i];
      } else {
        avgLoss += changes[i].abs();
      }
    }
    
    avgGain /= periods;
    avgLoss /= periods;
    
    // Calculate RSI using Wilder's smoothing method
    for (int i = periods; i < changes.length; i++) {
      final change = changes[i];
      if (change > 0) {
        avgGain = (avgGain * (periods - 1) + change) / periods;
        avgLoss = (avgLoss * (periods - 1)) / periods;
      } else {
        avgGain = (avgGain * (periods - 1)) / periods;
        avgLoss = (avgLoss * (periods - 1) + change.abs()) / periods;
      }
    }
    
    if (avgLoss == 0) {
      return 100.0;
    }
    
    final rs = avgGain / avgLoss;
    final rsi = 100 - (100 / (1 + rs));
    
    return rsi;
  }
}
