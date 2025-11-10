import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../../data/models/price_data.dart';
import '../../../core/theme/app_theme.dart';

class PriceChart extends StatelessWidget {
  final List<PriceData> priceData;
  final IndicatorData? indicators;

  const PriceChart({
    super.key,
    required this.priceData,
    this.indicators,
  });

  @override
  Widget build(BuildContext context) {
    if (priceData.isEmpty) {
      return const SizedBox.shrink();
    }

    final spots = priceData.asMap().entries.map((entry) {
      return FlSpot(entry.key.toDouble(), entry.value.close);
    }).toList();

    final minY = priceData.map((p) => p.low).reduce((a, b) => a < b ? a : b);
    final maxY = priceData.map((p) => p.high).reduce((a, b) => a > b ? a : b);

    return Card(
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Gráfico de Precios',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 300,
              child: LineChart(
                LineChartData(
                  gridData: FlGridData(show: true),
                  titlesData: FlTitlesData(
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 40,
                        getTitlesWidget: (value, meta) {
                          return Text(
                            value.toStringAsFixed(4),
                            style: const TextStyle(fontSize: 10),
                          );
                        },
                      ),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 30,
                        getTitlesWidget: (value, meta) {
                          if (value.toInt() % 10 == 0 && value.toInt() < priceData.length) {
                            return Text(
                              '${value.toInt()}',
                              style: const TextStyle(fontSize: 10),
                            );
                          }
                          return const Text('');
                        },
                      ),
                    ),
                    rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                  ),
                  borderData: FlBorderData(show: true),
                  minY: minY * 0.999,
                  maxY: maxY * 1.001,
                  lineBarsData: [
                    // Price line
                    LineChartBarData(
                      spots: spots,
                      isCurved: true,
                      color: AppTheme.primaryColor,
                      barWidth: 2,
                      dotData: const FlDotData(show: false),
                      belowBarData: BarAreaData(show: false),
                    ),
                    // Bollinger Upper
                    if (indicators?.bollingerUpper != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.bollingerUpper!),
                        ),
                        isCurved: false,
                        color: AppTheme.dangerColor.withOpacity(0.5),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                        dashArray: [5, 5],
                      ),
                    // Bollinger Middle (SMA)
                    if (indicators?.bollingerMiddle != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.bollingerMiddle!),
                        ),
                        isCurved: false,
                        color: AppTheme.warningColor.withOpacity(0.7),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                        dashArray: [3, 3],
                      ),
                    // Bollinger Lower
                    if (indicators?.bollingerLower != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.bollingerLower!),
                        ),
                        isCurved: false,
                        color: AppTheme.successColor.withOpacity(0.5),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                        dashArray: [5, 5],
                      ),
                    // SMA 20
                    if (indicators?.sma20 != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.sma20!),
                        ),
                        isCurved: false,
                        color: Colors.blue.withOpacity(0.5),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                      ),
                    // SMA 50
                    if (indicators?.sma50 != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.sma50!),
                        ),
                        isCurved: false,
                        color: Colors.purple.withOpacity(0.5),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                      ),
                    // EMA 20
                    if (indicators?.ema20 != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.ema20!),
                        ),
                        isCurved: true,
                        color: Colors.cyan.withOpacity(0.5),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                      ),
                    // EMA 50
                    if (indicators?.ema50 != null)
                      LineChartBarData(
                        spots: List.generate(
                          priceData.length,
                          (i) => FlSpot(i.toDouble(), indicators!.ema50!),
                        ),
                        isCurved: true,
                        color: Colors.orange.withOpacity(0.5),
                        barWidth: 1,
                        dotData: const FlDotData(show: false),
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            _Legend(),
          ],
        ),
      ),
    );
  }
}

class _Legend extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 16,
      runSpacing: 8,
      children: [
        _LegendItem('Precio', AppTheme.primaryColor),
        if (true) _LegendItem('Bollinger Superior', AppTheme.dangerColor.withOpacity(0.5), isDashed: true),
        if (true) _LegendItem('Bollinger Media', AppTheme.warningColor.withOpacity(0.7), isDashed: true),
        if (true) _LegendItem('Bollinger Inferior', AppTheme.successColor.withOpacity(0.5), isDashed: true),
        if (true) _LegendItem('SMA 20', Colors.blue.withOpacity(0.5)),
        if (true) _LegendItem('SMA 50', Colors.purple.withOpacity(0.5)),
        if (true) _LegendItem('EMA 20', Colors.cyan.withOpacity(0.5)),
        if (true) _LegendItem('EMA 50', Colors.orange.withOpacity(0.5)),
      ],
    );
  }
}

class _LegendItem extends StatelessWidget {
  final String label;
  final Color color;
  final bool isDashed;

  const _LegendItem(this.label, this.color, {this.isDashed = false});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 16,
          height: 2,
          decoration: BoxDecoration(
            color: color,
            border: isDashed ? Border.all(color: color, width: 1) : null,
          ),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }
}
