import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/settings_provider.dart';
import '../../../core/constants/app_constants.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Configuración'),
      ),
      body: Consumer<SettingsProvider>(
        builder: (context, settings, _) {
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _SectionTitle('Pares de Divisas'),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: AppConstants.defaultPairs.map((pair) {
                      final isSelected = settings.selectedPairs.contains(pair);
                      return FilterChip(
                        label: Text(pair),
                        selected: isSelected,
                        onSelected: (selected) {
                          final newPairs = List<String>.from(settings.selectedPairs);
                          if (selected) {
                            newPairs.add(pair);
                          } else {
                            newPairs.remove(pair);
                          }
                          settings.setSelectedPairs(newPairs);
                        },
                      );
                    }).toList(),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              _SectionTitle('Indicadores'),
              Card(
                child: Column(
                  children: [
                    ListTile(
                      title: const Text('Períodos RSI'),
                      subtitle: Text('${settings.rsiPeriods} períodos'),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.remove),
                            onPressed: () {
                              if (settings.rsiPeriods > 5) {
                                settings.setRSIPeriods(settings.rsiPeriods - 1);
                              }
                            },
                          ),
                          Text('${settings.rsiPeriods}'),
                          IconButton(
                            icon: const Icon(Icons.add),
                            onPressed: () {
                              if (settings.rsiPeriods < 30) {
                                settings.setRSIPeriods(settings.rsiPeriods + 1);
                              }
                            },
                          ),
                        ],
                      ),
                    ),
                    ListTile(
                      title: const Text('RSI Sobreventa'),
                      subtitle: Text('${settings.rsiOversold.toStringAsFixed(1)}'),
                      trailing: Slider(
                        value: settings.rsiOversold,
                        min: 10,
                        max: 40,
                        divisions: 30,
                        label: settings.rsiOversold.toStringAsFixed(1),
                        onChanged: (value) {
                          settings.setRSIThresholds(
                            value,
                            settings.rsiOverbought,
                          );
                        },
                      ),
                    ),
                    ListTile(
                      title: const Text('RSI Sobrecompra'),
                      subtitle: Text('${settings.rsiOverbought.toStringAsFixed(1)}'),
                      trailing: Slider(
                        value: settings.rsiOverbought,
                        min: 60,
                        max: 90,
                        divisions: 30,
                        label: settings.rsiOverbought.toStringAsFixed(1),
                        onChanged: (value) {
                          settings.setRSIThresholds(
                            settings.rsiOversold,
                            value,
                          );
                        },
                      ),
                    ),
                    ListTile(
                      title: const Text('Períodos Bollinger'),
                      subtitle: Text('${settings.bollingerPeriods} períodos'),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.remove),
                            onPressed: () {
                              if (settings.bollingerPeriods > 10) {
                                settings.setBollingerSettings(
                                  settings.bollingerPeriods - 1,
                                  settings.bollingerStdDev,
                                );
                              }
                            },
                          ),
                          Text('${settings.bollingerPeriods}'),
                          IconButton(
                            icon: const Icon(Icons.add),
                            onPressed: () {
                              if (settings.bollingerPeriods < 50) {
                                settings.setBollingerSettings(
                                  settings.bollingerPeriods + 1,
                                  settings.bollingerStdDev,
                                );
                              }
                            },
                          ),
                        ],
                      ),
                    ),
                    ListTile(
                      title: const Text('Desviación Estándar Bollinger'),
                      subtitle: Text('${settings.bollingerStdDev.toStringAsFixed(1)}'),
                      trailing: Slider(
                        value: settings.bollingerStdDev,
                        min: 1.0,
                        max: 3.0,
                        divisions: 20,
                        label: settings.bollingerStdDev.toStringAsFixed(1),
                        onChanged: (value) {
                          settings.setBollingerSettings(
                            settings.bollingerPeriods,
                            value,
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              _SectionTitle('Actualización'),
              Card(
                child: ListTile(
                  title: const Text('Intervalo de Actualización'),
                  subtitle: Text('Cada ${settings.updateInterval} minutos'),
                  trailing: DropdownButton<int>(
                    value: settings.updateInterval,
                    items: AppConstants.updateIntervals.map((interval) {
                      return DropdownMenuItem(
                        value: interval,
                        child: Text('$interval min'),
                      );
                    }).toList(),
                    onChanged: (value) {
                      if (value != null) {
                        settings.setUpdateInterval(value);
                      }
                    },
                  ),
                ),
              ),
              const SizedBox(height: 16),
              _SectionTitle('Notificaciones'),
              Card(
                child: SwitchListTile(
                  title: const Text('Activar Notificaciones'),
                  subtitle: const Text('Recibir alertas de señales'),
                  value: settings.notificationsEnabled,
                  onChanged: (value) {
                    settings.setNotificationsEnabled(value);
                  },
                ),
              ),
              if (settings.notificationsEnabled)
                Card(
                  child: ListTile(
                    title: const Text('Nivel de Confianza Mínimo'),
                    subtitle: const Text('Solo notificar señales con este nivel o superior'),
                    trailing: DropdownButton<String>(
                      value: settings.notificationConfidence,
                      items: [
                        DropdownMenuItem(
                          value: AppConstants.confidenceHigh,
                          child: const Text('Alta'),
                        ),
                        DropdownMenuItem(
                          value: AppConstants.confidenceMedium,
                          child: const Text('Media'),
                        ),
                        DropdownMenuItem(
                          value: AppConstants.confidenceLow,
                          child: const Text('Baja'),
                        ),
                      ],
                      onChanged: (value) {
                        if (value != null) {
                          settings.setNotificationConfidence(value);
                        }
                      },
                    ),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;

  const _SectionTitle(this.title);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, top: 8),
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
