import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class EducationScreen extends StatelessWidget {
  const EducationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Educación'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _EducationCard(
            title: 'Bandas de Bollinger',
            icon: Icons.show_chart,
            content: '''
Las Bandas de Bollinger son un indicador técnico que muestra la volatilidad del mercado.

**Cómo funcionan:**
- Se calculan usando una media móvil (típicamente 20 períodos) y dos desviaciones estándar
- La banda superior e inferior muestran los niveles de sobrecompra y sobreventa

**Señales:**
- Cuando el precio toca la banda inferior: posible sobreventa (señal de compra)
- Cuando el precio toca la banda superior: posible sobrecompra (señal de venta)

**Uso en TradeSense:**
Combinamos las Bandas de Bollinger con otros indicadores para confirmar señales más confiables.
''',
          ),
          _EducationCard(
            title: 'RSI (Índice de Fuerza Relativa)',
            icon: Icons.speed,
            content: '''
El RSI mide la velocidad y magnitud de los cambios de precio.

**Escala:**
- RSI entre 0 y 100
- RSI > 70: Zona de sobrecompra (posible venta)
- RSI < 30: Zona de sobreventa (posible compra)

**Interpretación:**
- Un RSI alto indica que el activo puede estar sobrecomprado
- Un RSI bajo indica que el activo puede estar sobrevendido

**Uso en TradeSense:**
Usamos RSI de 14 períodos para identificar condiciones extremas del mercado.
''',
          ),
          _EducationCard(
            title: 'Medias Móviles (SMA/EMA)',
            icon: Icons.trending_up,
            content: '''
Las medias móviles suavizan los datos de precio para identificar tendencias.

**SMA (Simple Moving Average):**
- Promedio simple de los precios de cierre
- Más estable pero más lenta en responder a cambios

**EMA (Exponential Moving Average):**
- Da más peso a los precios recientes
- Responde más rápido a cambios de tendencia

**Uso en TradeSense:**
- EMA20 y EMA50: Confirmación de tendencia
- Cuando EMA20 > EMA50: Tendencia alcista
- Cuando EMA20 < EMA50: Tendencia bajista
- Precio por encima de SMA50: Confirmación adicional de tendencia alcista
''',
          ),
          _EducationCard(
            title: 'Estrategia Combinada',
            icon: Icons.psychology,
            content: '''
TradeSense combina múltiples indicadores para generar señales más confiables.

**Señal de Compra:**
1. Precio toca banda inferior de Bollinger
2. RSI < 30 (sobreventa)
3. EMA20 > EMA50 (confirmación de tendencia alcista)
4. Precio > SMA50 (confirmación adicional)

**Señal de Venta:**
1. Precio toca banda superior de Bollinger
2. RSI > 70 (sobrecompra)
3. EMA20 < EMA50 (confirmación de tendencia bajista)
4. Precio < SMA50 (confirmación adicional)

**Niveles de Confianza:**
- Alta: Todas las condiciones cumplidas
- Media: Condiciones principales sin todas las confirmaciones
- Baja: Solo condiciones básicas (Bollinger + RSI)
''',
          ),
          _EducationCard(
            title: 'Consejos Importantes',
            icon: Icons.lightbulb,
            content: '''
**Recuerda:**
- Las señales son sugerencias educativas, no garantías
- Siempre realiza tu propio análisis antes de operar
- El trading conlleva riesgo de pérdida de capital
- Considera usar stop-loss y take-profit
- No inviertas más de lo que puedes permitirte perder
- Mantén un diario de trading para aprender de tus decisiones

**Práctica:**
Usa esta app para aprender y practicar el análisis técnico antes de operar con dinero real.
''',
          ),
        ],
      ),
    );
  }
}

class _EducationCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final String content;

  const _EducationCard({
    required this.title,
    required this.icon,
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: AppTheme.primaryColor),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              content,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
