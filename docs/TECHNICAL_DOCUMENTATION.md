# TradeSense - Documentación Técnica

## Descripción General

TradeSense es una aplicación móvil multiplataforma desarrollada con Flutter que proporciona señales de trading educativas basadas en análisis técnico para el mercado Forex.

## Requisitos del Sistema

- Flutter SDK >= 3.0.0
- Dart SDK >= 3.0.0
- Android Studio / Xcode (para desarrollo móvil)
- Android API 21+ / iOS 12+

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd tradesense
```

### 2. Instalar dependencias

```bash
flutter pub get
```

### 3. Configurar la aplicación

La aplicación utiliza datos mock por defecto. Para usar una API real de Forex:

1. Obtener una API key de un proveedor (Alpha Vantage, Twelve Data, etc.)
2. Modificar `lib/data/datasources/remote/forex_remote_data_source.dart`
3. Actualizar el método `getHistoricalData` con la llamada real a la API

### 4. Ejecutar la aplicación

```bash
# Android
flutter run

# iOS
flutter run -d ios

# Web (para pruebas)
flutter run -d chrome
```

## Estructura del Proyecto

```
lib/
├── main.dart                    # Punto de entrada
├── core/                        # Componentes core
│   ├── constants/              # Constantes de la app
│   ├── theme/                  # Temas claro/oscuro
│   ├── utils/                  # Utilidades
│   └── errors/                 # Manejo de errores
├── data/                       # Capa de datos
│   ├── models/                 # Modelos de datos
│   ├── repositories/           # Repositorios
│   ├── datasources/            # Fuentes de datos
│   │   ├── remote/            # API remota
│   │   └── local/              # Base de datos local
│   └── api/                    # Cliente API
├── domain/                     # Capa de dominio
│   ├── entities/               # Entidades de dominio
│   ├── repositories/          # Interfaces de repositorios
│   └── usecases/              # Casos de uso
├── presentation/               # Capa de presentación
│   ├── screens/               # Pantallas
│   ├── widgets/               # Widgets reutilizables
│   └── providers/             # State management
└── services/                   # Servicios de negocio
    ├── indicators/            # Cálculo de indicadores
    ├── signals/               # Generación de señales
    └── notifications/         # Notificaciones
```

## Componentes Principales

### Indicadores Técnicos

- **Bollinger Bands**: Implementado en `lib/services/indicators/bollinger_bands_service.dart`
- **RSI**: Implementado en `lib/services/indicators/rsi_service.dart`
- **Moving Averages**: Implementado en `lib/services/indicators/moving_average_service.dart`

### Generación de Señales

La lógica de generación de señales está en `lib/services/signals/signal_generator.dart`:

- **Señal de Compra**: Precio toca banda inferior + RSI < 30 + confirmaciones
- **Señal de Venta**: Precio toca banda superior + RSI > 70 + confirmaciones

### Persistencia de Datos

- **SQLite**: Para almacenar datos históricos y señales
- **SharedPreferences**: Para configuración del usuario

## Configuración

### Personalización de Indicadores

Los usuarios pueden personalizar:
- Períodos de RSI (default: 14)
- Umbrales de RSI (default: 30/70)
- Períodos de Bollinger (default: 20)
- Desviación estándar de Bollinger (default: 2.0)
- Pares de divisas a monitorear
- Intervalo de actualización (15/30/60 minutos)

### Notificaciones

Las notificaciones se pueden configurar para:
- Activar/desactivar
- Filtrar por nivel de confianza (alta/media/baja)

## Testing

```bash
# Ejecutar tests unitarios
flutter test

# Ejecutar tests de integración
flutter test integration_test/
```

## Build para Producción

### Android

```bash
flutter build apk --release
# o
flutter build appbundle --release
```

### iOS

```bash
flutter build ios --release
```

## Próximas Mejoras

- [ ] Integración con API real de Forex
- [ ] Sistema de notificaciones push completo
- [ ] Historial de señales con backtesting
- [ ] Exportación de datos a CSV
- [ ] Múltiples estrategias configurables
- [ ] Sistema de gamificación educativa

## Licencia

Ver archivo LICENSE para más detalles.

## Soporte

Para problemas o preguntas, por favor abra un issue en el repositorio.
