import 'package:flutter/material.dart';
import '../../../data/models/price_data.dart';
import '../../../data/repositories/forex_repository.dart';

class MarketDataProvider extends ChangeNotifier {
  final ForexRepository _repository;
  
  MarketDataProvider({ForexRepository? repository})
      : _repository = repository ?? ForexRepository();
  
  Map<String, List<PriceData>> _priceData = {};
  Map<String, IndicatorData> _indicators = {};
  bool _isLoading = false;
  String? _error;
  
  Map<String, List<PriceData>> get priceData => _priceData;
  Map<String, IndicatorData> get indicators => _indicators;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  Future<void> loadMarketData(String symbol, int limit) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      final data = await _repository.getMarketData(symbol, limit);
      _priceData[symbol] = data;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _isLoading = false;
    }
  }
  
  void setIndicators(String symbol, IndicatorData indicators) {
    _indicators[symbol] = indicators;
    notifyListeners();
  }
  
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
