import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../data/models/trading_signal.dart';
import '../../../services/signals/signal_generator.dart';
import '../../../services/indicators/indicator_calculator.dart';
import 'market_data_provider.dart';
import 'settings_provider.dart';

class SignalsProvider extends ChangeNotifier {
  final SignalGenerator _signalGenerator;
  MarketDataProvider? _marketDataProvider;
  SettingsProvider? _settingsProvider;
  
  SignalsProvider({
    SignalGenerator? signalGenerator,
  }) : _signalGenerator = signalGenerator ?? SignalGenerator();
  
  void setDependencies(MarketDataProvider marketDataProvider, SettingsProvider settingsProvider) {
    _marketDataProvider = marketDataProvider;
    _settingsProvider = settingsProvider;
  }
  
  List<TradingSignal> _activeSignals = [];
  bool _isGenerating = false;
  
  List<TradingSignal> get activeSignals => _activeSignals;
  bool get isGenerating => _isGenerating;
  
  Future<void> generateSignalsForPairs(List<String> pairs) async {
    if (_marketDataProvider == null || _settingsProvider == null) {
      return;
    }
    
    _isGenerating = true;
    notifyListeners();
    
    final newSignals = <TradingSignal>[];
    
    for (final pair in pairs) {
      try {
        final priceData = _marketDataProvider!.priceData[pair];
        if (priceData == null || priceData.length < 50) {
          continue;
        }
        
        // Calculate indicators
        final indicators = IndicatorCalculator.calculateAllIndicators(
          priceData,
          bollingerPeriods: _settingsProvider!.bollingerPeriods,
          bollingerStdDev: _settingsProvider!.bollingerStdDev,
          rsiPeriods: _settingsProvider!.rsiPeriods,
        );
        
        _marketDataProvider!.setIndicators(pair, indicators);
        
        // Generate signal
        final signal = _signalGenerator.generateSignal(
          pair,
          priceData,
          indicators,
          rsiOversold: _settingsProvider!.rsiOversold,
          rsiOverbought: _settingsProvider!.rsiOverbought,
        );
        
        if (signal != null) {
          newSignals.add(signal);
        }
      } catch (e) {
        // Skip errors for individual pairs
        continue;
      }
    }
    
    _activeSignals = newSignals;
    _isGenerating = false;
    notifyListeners();
  }
  
  void clearSignals() {
    _activeSignals = [];
    notifyListeners();
  }
}
