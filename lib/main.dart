import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tradesense/core/theme/app_theme.dart';
import 'package:tradesense/presentation/providers/theme_provider.dart';
import 'package:tradesense/presentation/screens/home/home_screen.dart';
import 'package:tradesense/presentation/providers/market_data_provider.dart';
import 'package:tradesense/presentation/providers/signals_provider.dart';
import 'package:tradesense/presentation/providers/settings_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const TradeSenseApp());
}

class TradeSenseApp extends StatelessWidget {
  const TradeSenseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => SettingsProvider()),
        ChangeNotifierProvider(create: (_) => MarketDataProvider()),
        ChangeNotifierProvider(
          create: (context) {
            final signalsProvider = SignalsProvider();
            // Initialize dependencies after providers are created
            WidgetsBinding.instance.addPostFrameCallback((_) {
              final marketDataProvider = Provider.of<MarketDataProvider>(context, listen: false);
              final settingsProvider = Provider.of<SettingsProvider>(context, listen: false);
              signalsProvider.setDependencies(marketDataProvider, settingsProvider);
            });
            return signalsProvider;
          },
        ),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, _) {
          return MaterialApp(
            title: 'TradeSense',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: themeProvider.themeMode,
            home: const HomeScreen(),
          );
        },
      ),
    );
  }
}
