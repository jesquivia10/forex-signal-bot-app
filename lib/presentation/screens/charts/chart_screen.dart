import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../providers/market_data_provider.dart';
import '../../../data/models/price_data.dart';
import '../../widgets/charts/price_chart.dart';

class ChartScreen extends StatefulWidget {
  final String pairSymbol;

  const ChartScreen({
    super.key,
    required this.pairSymbol,
  });

  @override
  State<ChartScreen> createState() => _ChartScreenState();
}

class _ChartScreenState extends State<ChartScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.pairSymbol),
      ),
      body: Consumer<MarketDataProvider>(
        builder: (context, provider, _) {
          final priceData = provider.priceData[widget.pairSymbol];
          final indicators = provider.indicators[widget.pairSymbol];

          if (priceData == null || priceData.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          return SingleChildScrollView(
            child: Column(
              children: [
                PriceChart(
                  priceData: priceData,
                  indicators: indicators,
                ),
                if (indicators != null) ...[
                  const SizedBox(height: 16),
                  _IndicatorPanel(indicators: indicators),
                ],
              ],
            ),
          );
        },
      ),
    );
  }
}

class _IndicatorPanel extends StatelessWidget {
  final IndicatorData indicators;

  const _IndicatorPanel({required this.indicators});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Indicadores Técnicos',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            _IndicatorRow(
              label: 'RSI',
              value: indicators.rsi?.toStringAsFixed(2) ?? 'N/A',
              color: _getRSIColor(indicators.rsi),
            ),
            _IndicatorRow(
              label: 'Bollinger Superior',
              value: indicators.bollingerUpper?.toStringAsFixed(5) ?? 'N/A',
            ),
            _IndicatorRow(
              label: 'Bollinger Media',
              value: indicators.bollingerMiddle?.toStringAsFixed(5) ?? 'N/A',
            ),
            _IndicatorRow(
              label: 'Bollinger Inferior',
              value: indicators.bollingerLower?.toStringAsFixed(5) ?? 'N/A',
            ),
            _IndicatorRow(
              label: 'SMA 20',
              value: indicators.sma20?.toStringAsFixed(5) ?? 'N/A',
            ),
            _IndicatorRow(
              label: 'SMA 50',
              value: indicators.sma50?.toStringAsFixed(5) ?? 'N/A',
            ),
            _IndicatorRow(
              label: 'EMA 20',
              value: indicators.ema20?.toStringAsFixed(5) ?? 'N/A',
            ),
            _IndicatorRow(
              label: 'EMA 50',
              value: indicators.ema50?.toStringAsFixed(5) ?? 'N/A',
            ),
          ],
        ),
      ),
    );
  }

  Color? _getRSIColor(double? rsi) {
    if (rsi == null) return null;
    if (rsi < 30) return AppTheme.successColor;
    if (rsi > 70) return AppTheme.dangerColor;
    return null;
  }
}

class _IndicatorRow extends StatelessWidget {
  final String label;
  final String value;
  final Color? color;

  const _IndicatorRow({
    required this.label,
    required this.value,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: color,
              fontWeight: color != null ? FontWeight.bold : null,
            ),
          ),
        ],
      ),
    );
  }
}
