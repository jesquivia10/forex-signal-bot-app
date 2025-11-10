import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../../data/models/trading_signal.dart';
import '../../../core/theme/app_theme.dart';

class SignalCard extends StatelessWidget {
  final TradingSignal signal;
  final VoidCallback onTap;

  const SignalCard({
    super.key,
    required this.signal,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isBuy = signal.type == SignalType.buy;
    final color = isBuy ? AppTheme.successColor : AppTheme.dangerColor;
    
    return Card(
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    signal.pairSymbol,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  _ConfidenceBadge(confidence: signal.confidence),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: color),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          isBuy ? Icons.trending_up : Icons.trending_down,
                          color: color,
                          size: 20,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          isBuy ? 'COMPRA' : 'VENTA',
                          style: TextStyle(
                            color: color,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  Text(
                    'Precio: ${signal.currentPrice.toStringAsFixed(5)}',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                signal.reason,
                style: Theme.of(context).textTheme.bodySmall,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(
                    Icons.access_time,
                    size: 14,
                    color: Theme.of(context).textTheme.bodySmall?.color,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    DateFormat('dd/MM/yyyy HH:mm').format(signal.timestamp),
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ConfidenceBadge extends StatelessWidget {
  final ConfidenceLevel confidence;

  const _ConfidenceBadge({required this.confidence});

  @override
  Widget build(BuildContext context) {
    Color color;
    String label;
    
    switch (confidence) {
      case ConfidenceLevel.high:
        color = AppTheme.successColor;
        label = 'Alta';
        break;
      case ConfidenceLevel.medium:
        color = AppTheme.warningColor;
        label = 'Media';
        break;
      case ConfidenceLevel.low:
        color = AppTheme.dangerColor;
        label = 'Baja';
        break;
    }
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
