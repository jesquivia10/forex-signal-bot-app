# TradeSense

**Aplicación móvil multiplataforma para análisis técnico y señales de trading en Forex**

## Descripción

TradeSense es una aplicación educativa diseñada para ayudar a traders principiantes e intermedios a entender y utilizar indicadores técnicos en el mercado Forex. La aplicación genera señales de entrada basadas en una combinación de Bandas de Bollinger, RSI (Índice de Fuerza Relativa) y Medias Móviles.

## Características Principales

- ✅ **Análisis en Tiempo Real**: Actualización automática de datos de mercado
- ✅ **Indicadores Técnicos**: Bollinger Bands, RSI, SMA/EMA
- ✅ **Generación de Señales**: Alertas automáticas de compra/venta con niveles de confianza
- ✅ **Gráficos Interactivos**: Visualización de precios con indicadores superpuestos
- ✅ **Contenido Educativo**: Explicaciones detalladas de cada indicador
- ✅ **Personalización**: Ajuste de parámetros de indicadores y pares de divisas
- ✅ **Tema Claro/Oscuro**: Interfaz adaptable a tus preferencias
- ✅ **Notificaciones**: Alertas cuando se detectan señales relevantes

## Tecnologías

- **Framework**: Flutter 3.x
- **Lenguaje**: Dart
- **State Management**: Provider
- **Gráficos**: fl_chart
- **Persistencia**: SQLite, SharedPreferences
- **Notificaciones**: flutter_local_notifications

## Instalación

### Requisitos Previos

- Flutter SDK >= 3.0.0
- Dart SDK >= 3.0.0
- Android Studio / Xcode

### Pasos

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd tradesense
```

2. Instalar dependencias:
```bash
flutter pub get
```

3. Ejecutar la aplicación:
```bash
flutter run
```

## Uso

1. **Primera Ejecución**: Lee y acepta el aviso legal
2. **Pantalla Principal**: Visualiza las señales activas del momento
3. **Ver Detalles**: Toca una señal para ver el gráfico con indicadores
4. **Aprender**: Visita la sección de Educación para entender los indicadores
5. **Personalizar**: Ajusta los parámetros en Configuración según tus preferencias

## Documentación

- [Documentación Técnica](docs/TECHNICAL_DOCUMENTATION.md)
- [Manual de Usuario](docs/USER_MANUAL.md)
- [Arquitectura](docs/architecture.md)

## Estrategia de Señales

### Señal de Compra
- Precio toca banda inferior de Bollinger
- RSI < 30 (sobreventa)
- Confirmaciones opcionales: EMA20 > EMA50, Precio > SMA50

### Señal de Venta
- Precio toca banda superior de Bollinger
- RSI > 70 (sobrecompra)
- Confirmaciones opcionales: EMA20 < EMA50, Precio < SMA50

## Aviso Legal

Esta aplicación proporciona señales de trading basadas en análisis técnico únicamente con fines educativos. Las señales generadas son sugerencias y NO constituyen asesoramiento financiero profesional. El trading de divisas conlleva riesgo de pérdida de capital.

## Licencia

Ver archivo [LICENSE](LICENSE) para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## Estado del Proyecto

✅ Arquitectura definida
✅ Modelos de datos implementados
✅ Servicios de indicadores técnicos
✅ Generador de señales
✅ Interfaz de usuario completa
✅ Sistema de configuración
✅ Documentación técnica y de usuario

🚧 En desarrollo:
- Integración con API real de Forex
- Sistema completo de notificaciones
- Historial y backtesting
- Tests unitarios e integración

## Roadmap

- [ ] Integración con API real de Forex (Alpha Vantage / Twelve Data)
- [ ] Sistema completo de notificaciones push
- [ ] Historial de señales con análisis de rendimiento
- [ ] Backtesting básico de estrategias
- [ ] Exportación de datos a CSV
- [ ] Múltiples estrategias configurables
- [ ] Sistema de gamificación educativa
- [ ] Integración con cuentas demo (solo lectura)

## Soporte

Para problemas o preguntas, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ para la comunidad de traders**
