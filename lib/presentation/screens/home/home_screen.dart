import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../providers/signals_provider.dart';
import '../../providers/market_data_provider.dart';
import '../../providers/settings_provider.dart';
import '../../providers/theme_provider.dart';
import '../../../data/models/trading_signal.dart';
import '../../../core/theme/app_theme.dart';
import '../../widgets/common/signal_card.dart';
import '../charts/chart_screen.dart';
import '../education/education_screen.dart';
import '../settings/settings_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _initializeApp();
    });
  }

  Future<void> _initializeApp() async {
    final marketDataProvider = context.read<MarketDataProvider>();
    final signalsProvider = context.read<SignalsProvider>();
    final settingsProvider = context.read<SettingsProvider>();
    
    // Initialize dependencies
    signalsProvider.setDependencies(marketDataProvider, settingsProvider);
    
    // Show disclaimer if not accepted
    if (!settingsProvider.disclaimerAccepted) {
      _showDisclaimer();
      return;
    }
    
    // Load initial data
    await _loadMarketData();
  }

  Future<void> _loadMarketData() async {
    final marketDataProvider = context.read<MarketDataProvider>();
    final signalsProvider = context.read<SignalsProvider>();
    final settingsProvider = context.read<SettingsProvider>();
    
    // Load data for selected pairs
    for (final pair in settingsProvider.selectedPairs) {
      await marketDataProvider.loadMarketData(pair, 100);
    }
    
    // Generate signals
    await signalsProvider.generateSignalsForPairs(settingsProvider.selectedPairs);
  }

  void _showDisclaimer() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('Aviso Legal'),
        content: SingleChildScrollView(
          child: Text(
            'Esta aplicación proporciona señales de trading basadas en análisis técnico únicamente con fines educativos. Las señales generadas son sugerencias y NO constituyen asesoramiento financiero profesional.\n\n'
            'IMPORTANTE:\n'
            '- Las señales son solo sugerencias educativas\n'
            '- No garantizamos ganancias ni resultados específicos\n'
            '- El trading de divisas conlleva riesgo de pérdida de capital\n'
            '- Siempre realice su propia investigación antes de tomar decisiones\n'
            '- Considere consultar con un asesor financiero profesional\n\n'
            'El usuario es responsable de todas las decisiones de trading que tome.',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _loadMarketData();
              context.read<SettingsProvider>().acceptDisclaimer();
            },
            child: const Text('Aceptar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TradeSense'),
        actions: [
          IconButton(
            icon: const Icon(Icons.light_mode),
            onPressed: () {
              context.read<ThemeProvider>().toggleTheme();
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SettingsScreen()),
              );
            },
          ),
        ],
      ),
      body: Consumer<SignalsProvider>(
        builder: (context, signalsProvider, _) {
          if (signalsProvider.isGenerating) {
            return const Center(child: CircularProgressIndicator());
          }

          final signals = signalsProvider.activeSignals;

          if (signals.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.trending_up,
                    size: 64,
                    color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No hay señales activas',
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Las señales aparecerán aquí cuando se detecten oportunidades',
                    style: Theme.of(context).textTheme.bodyMedium,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: _loadMarketData,
                    icon: const Icon(Icons.refresh),
                    label: const Text('Actualizar'),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: _loadMarketData,
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: signals.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SignalCard(
                    signal: signals[index],
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => ChartScreen(
                            pairSymbol: signals[index].pairSymbol,
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _loadMarketData,
        icon: const Icon(Icons.refresh),
        label: const Text('Actualizar'),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            label: 'Educación',
          ),
        ],
        onTap: (index) {
          if (index == 1) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const EducationScreen()),
            );
          }
        },
      ),
    );
  }
}
