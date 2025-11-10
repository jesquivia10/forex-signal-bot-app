import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/constants/app_constants.dart';

class SettingsProvider extends ChangeNotifier {
  SharedPreferences? _prefs;
  
  // Settings
  int _updateInterval = AppConstants.defaultUpdateInterval;
  int _rsiPeriods = AppConstants.defaultRSIPeriods;
  double _rsiOversold = AppConstants.defaultRSIOversold;
  double _rsiOverbought = AppConstants.defaultRSIOverbought;
  int _bollingerPeriods = AppConstants.defaultBollingerPeriods;
  double _bollingerStdDev = AppConstants.defaultBollingerStdDev;
  List<String> _selectedPairs = List.from(AppConstants.defaultPairs);
  bool _notificationsEnabled = true;
  String _notificationConfidence = AppConstants.confidenceHigh;
  bool _disclaimerAccepted = false;
  
  SettingsProvider() {
    _loadSettings();
  }
  
  // Getters
  int get updateInterval => _updateInterval;
  int get rsiPeriods => _rsiPeriods;
  double get rsiOversold => _rsiOversold;
  double get rsiOverbought => _rsiOverbought;
  int get bollingerPeriods => _bollingerPeriods;
  double get bollingerStdDev => _bollingerStdDev;
  List<String> get selectedPairs => _selectedPairs;
  bool get notificationsEnabled => _notificationsEnabled;
  String get notificationConfidence => _notificationConfidence;
  bool get disclaimerAccepted => _disclaimerAccepted;
  
  Future<void> _loadSettings() async {
    _prefs = await SharedPreferences.getInstance();
    
    _updateInterval = _prefs?.getInt(AppConstants.keyUpdateInterval) ?? 
        AppConstants.defaultUpdateInterval;
    _rsiPeriods = _prefs?.getInt(AppConstants.keyRSIPeriods) ?? 
        AppConstants.defaultRSIPeriods;
    _rsiOversold = _prefs?.getDouble(AppConstants.keyRSIOversold) ?? 
        AppConstants.defaultRSIOversold;
    _rsiOverbought = _prefs?.getDouble(AppConstants.keyRSIOverbought) ?? 
        AppConstants.defaultRSIOverbought;
    _bollingerPeriods = _prefs?.getInt(AppConstants.keyBollingerPeriods) ?? 
        AppConstants.defaultBollingerPeriods;
    _bollingerStdDev = _prefs?.getDouble(AppConstants.keyBollingerStdDev) ?? 
        AppConstants.defaultBollingerStdDev;
    _selectedPairs = _prefs?.getStringList(AppConstants.keySelectedPairs) ?? 
        List.from(AppConstants.defaultPairs);
    _notificationsEnabled = _prefs?.getBool(AppConstants.keyNotificationEnabled) ?? true;
    _notificationConfidence = _prefs?.getString(AppConstants.keyNotificationConfidence) ?? 
        AppConstants.confidenceHigh;
    _disclaimerAccepted = _prefs?.getBool(AppConstants.keyDisclaimerAccepted) ?? false;
    
    notifyListeners();
  }
  
  Future<void> setUpdateInterval(int minutes) async {
    _updateInterval = minutes;
    await _prefs?.setInt(AppConstants.keyUpdateInterval, minutes);
    notifyListeners();
  }
  
  Future<void> setRSIPeriods(int periods) async {
    _rsiPeriods = periods;
    await _prefs?.setInt(AppConstants.keyRSIPeriods, periods);
    notifyListeners();
  }
  
  Future<void> setRSIThresholds(double oversold, double overbought) async {
    _rsiOversold = oversold;
    _rsiOverbought = overbought;
    await _prefs?.setDouble(AppConstants.keyRSIOversold, oversold);
    await _prefs?.setDouble(AppConstants.keyRSIOverbought, overbought);
    notifyListeners();
  }
  
  Future<void> setBollingerSettings(int periods, double stdDev) async {
    _bollingerPeriods = periods;
    _bollingerStdDev = stdDev;
    await _prefs?.setInt(AppConstants.keyBollingerPeriods, periods);
    await _prefs?.setDouble(AppConstants.keyBollingerStdDev, stdDev);
    notifyListeners();
  }
  
  Future<void> setSelectedPairs(List<String> pairs) async {
    _selectedPairs = pairs;
    await _prefs?.setStringList(AppConstants.keySelectedPairs, pairs);
    notifyListeners();
  }
  
  Future<void> setNotificationsEnabled(bool enabled) async {
    _notificationsEnabled = enabled;
    await _prefs?.setBool(AppConstants.keyNotificationEnabled, enabled);
    notifyListeners();
  }
  
  Future<void> setNotificationConfidence(String confidence) async {
    _notificationConfidence = confidence;
    await _prefs?.setString(AppConstants.keyNotificationConfidence, confidence);
    notifyListeners();
  }
  
  Future<void> acceptDisclaimer() async {
    _disclaimerAccepted = true;
    await _prefs?.setBool(AppConstants.keyDisclaimerAccepted, true);
    notifyListeners();
  }
}
