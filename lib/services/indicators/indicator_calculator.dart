import 'dart:math';
import 'package:tradesense/data/models/price_data.dart';
import 'package:tradesense/core/constants/app_constants.dart';
import 'bollinger_bands_service.dart';
import 'rsi_service.dart';
import 'moving_average_service.dart';

class IndicatorCalculator {
  static IndicatorData calculateAllIndicators(
    List<PriceData> prices, {
    int bollingerPeriods = AppConstants.defaultBollingerPeriods,
    double bollingerStdDev = AppConstants.defaultBollingerStdDev,
    int rsiPeriods = AppConstants.defaultRSIPeriods,
    int sma20Periods = AppConstants.defaultSMA20Periods,
    int sma50Periods = AppConstants.defaultSMA50Periods,
    int ema20Periods = AppConstants.defaultEMA20Periods,
    int ema50Periods = AppConstants.defaultEMA50Periods,
  }) {
    final bollinger = BollingerBandsService.calculateBollingerBands(
      prices,
      bollingerPeriods,
      bollingerStdDev,
    );
    
    final rsi = RSIService.calculateRSI(prices, rsiPeriods);
    
    final movingAverages = MovingAverageService.calculateMovingAverages(
      prices,
      sma20Periods,
      sma50Periods,
      ema20Periods,
      ema50Periods,
    );
    
    return IndicatorData(
      bollingerUpper: bollinger.bollingerUpper,
      bollingerMiddle: bollinger.bollingerMiddle,
      bollingerLower: bollinger.bollingerLower,
      rsi: rsi,
      sma20: movingAverages.sma20,
      sma50: movingAverages.sma50,
      ema20: movingAverages.ema20,
      ema50: movingAverages.ema50,
    );
  }
}
