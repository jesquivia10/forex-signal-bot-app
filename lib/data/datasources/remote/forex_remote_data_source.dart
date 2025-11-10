import 'package:dio/dio.dart';
import '../../models/price_data.dart';
import '../../../core/constants/app_constants.dart';

class ForexRemoteDataSource {
  final Dio _dio;
  
  ForexRemoteDataSource({Dio? dio}) : _dio = dio ?? Dio();
  
  Future<List<PriceData>> getHistoricalData(
    String symbol,
    int limit,
  ) async {
    try {
      // Mock data for development - replace with real API call
      // Example: Alpha Vantage or Twelve Data API
      return _generateMockData(symbol, limit);
    } catch (e) {
      throw Exception('Error fetching market data: $e');
    }
  }
  
  Future<PriceData> getCurrentPrice(String symbol) async {
    try {
      // Mock current price - replace with real API call
      final mockData = _generateMockData(symbol, 1);
      return mockData.first;
    } catch (e) {
      throw Exception('Error fetching current price: $e');
    }
  }
  
  // Mock data generator for development
  List<PriceData> _generateMockData(String symbol, int limit) {
    final now = DateTime.now();
    final data = <PriceData>[];
    
    // Base price varies by symbol
    double basePrice = 1.1000;
    if (symbol.contains('GBP')) basePrice = 1.2500;
    if (symbol.contains('JPY')) basePrice = 110.00;
    if (symbol.contains('CHF')) basePrice = 0.9200;
    if (symbol.contains('AUD')) basePrice = 0.7500;
    if (symbol.contains('CAD')) basePrice = 1.3500;
    if (symbol.contains('NZD')) basePrice = 0.6800;
    
    double currentPrice = basePrice;
    
    for (int i = limit - 1; i >= 0; i--) {
      final timestamp = now.subtract(Duration(minutes: i * 15));
      
      // Simulate price movement
      final change = (i % 10 - 5) * 0.0001;
      currentPrice += change;
      
      final open = currentPrice;
      final high = currentPrice + 0.0005;
      final low = currentPrice - 0.0005;
      final close = currentPrice + (change * 0.5);
      
      data.add(PriceData(
        timestamp: timestamp,
        open: open,
        high: high,
        low: low,
        close: close,
        volume: 1000000.0,
      ));
    }
    
    return data;
  }
}
