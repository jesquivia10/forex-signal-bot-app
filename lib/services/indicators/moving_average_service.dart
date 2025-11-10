import 'package:tradesense/data/models/price_data.dart';

class MovingAverageService {
  static double? calculateSMA(List<PriceData> prices, int periods) {
    if (prices.length < periods) {
      return null;
    }
    
    final recentPrices = prices.sublist(prices.length - periods);
    final sum = recentPrices.map((p) => p.close).reduce((a, b) => a + b);
    return sum / periods;
  }
  
  static double? calculateEMA(List<PriceData> prices, int periods) {
    if (prices.length < periods) {
      return null;
    }
    
    final multiplier = 2.0 / (periods + 1);
    double ema = prices[0].close;
    
    for (int i = 1; i < prices.length; i++) {
      ema = (prices[i].close - ema) * multiplier + ema;
    }
    
    return ema;
  }
  
  static IndicatorData calculateMovingAverages(
    List<PriceData> prices,
    int sma20Periods,
    int sma50Periods,
    int ema20Periods,
    int ema50Periods,
  ) {
    return IndicatorData(
      sma20: calculateSMA(prices, sma20Periods),
      sma50: calculateSMA(prices, sma50Periods),
      ema20: calculateEMA(prices, ema20Periods),
      ema50: calculateEMA(prices, ema50Periods),
    );
  }
}
