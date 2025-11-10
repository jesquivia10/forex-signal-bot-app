import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:tradesense/data/models/trading_signal.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notifications =
      FlutterLocalNotificationsPlugin();
  
  static bool _initialized = false;
  
  static Future<void> initialize() async {
    if (_initialized) return;
    
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    
    const initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );
    
    await _notifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );
    
    _initialized = true;
  }
  
  static void _onNotificationTapped(NotificationResponse response) {
    // Handle notification tap
  }
  
  static Future<void> showSignalNotification(TradingSignal signal) async {
    await initialize();
    
    const androidDetails = AndroidNotificationDetails(
      'tradesense_signals',
      'Señales de Trading',
      channelDescription: 'Notificaciones de señales de trading',
      importance: Importance.high,
      priority: Priority.high,
    );
    
    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    
    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    final title = signal.type == SignalType.buy
        ? 'Señal de COMPRA - ${signal.pairSymbol}'
        : 'Señal de VENTA - ${signal.pairSymbol}';
    
    final body = 'Confianza: ${_getConfidenceText(signal.confidence)}\n'
        '${signal.reason.split('\n').first}';
    
    await _notifications.show(
      signal.id.hashCode,
      title,
      body,
      details,
    );
  }
  
  static String _getConfidenceText(ConfidenceLevel confidence) {
    switch (confidence) {
      case ConfidenceLevel.high:
        return 'Alta';
      case ConfidenceLevel.medium:
        return 'Media';
      case ConfidenceLevel.low:
        return 'Baja';
    }
  }
  
  static Future<void> cancelAll() async {
    await _notifications.cancelAll();
  }
}
