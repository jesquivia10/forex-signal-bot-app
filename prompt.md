Prompt para el agente de IA — Desarrollo de App de Señales de Trading

Objetivo general:
Desarrollar una aplicación móvil multiplataforma (compatible con iOS y Android) que funcione como bot de análisis y generador de señales de entrada en el mercado de divisas (Forex), utilizando una estrategia técnica sencilla y comprensible basada en Bandas de Bollinger, RSI (Índice de Fuerza Relativa) y Medias Móviles (MA / EMA).
La app no ejecutará operaciones reales, solo ofrecerá sugerencias de entrada y alertas, sirviendo como herramienta educativa y de apoyo para traders principiantes e intermedios.

🎯 Requisitos funcionales principales:

Análisis de mercado en tiempo real:

Integrar conexión con una fuente confiable de datos de precios Forex (por ejemplo, API de MetaTrader, Binance, Alpha Vantage o similares).

Actualización de precios en intervalos de 15 minutos.

Análisis automático de los pares de divisas más comunes (ejemplo: EUR/USD, GBP/USD, USD/JPY, etc.).

Estrategia técnica base:

Bandas de Bollinger (20 periodos, 2 desviaciones estándar):

Señal de compra: cuando el precio toque la banda inferior y RSI esté en zona de sobreventa.

Señal de venta: cuando el precio toque la banda superior y RSI esté en zona de sobrecompra.

RSI (14 periodos):

Sobrecompra >70, sobreventa <30.

Media Móvil Simple (SMA) y Exponencial (EMA) de 20 y 50 periodos:

Confirmación de tendencia y filtro de señales falsas.

Combinación de estos indicadores para generar alertas visuales y auditivas.

Generación de señales:

Señales de “Posible Compra” o “Posible Venta” acompañadas de:

Gráfico del par de divisas.

Breve resumen de los indicadores que justifican la alerta.

Nivel de confianza estimado (bajo, medio, alto).

Permitir que el usuario personalice los umbrales de RSI o períodos de medias.

Interfaz de usuario (UI/UX):

Diseño minimalista, educativo y moderno.

Mostrar gráficos interactivos con indicadores superpuestos.

Pantalla principal con las señales activas del momento.

Sección educativa que explique cómo funcionan los indicadores.

Modo oscuro y claro.

Notificaciones:

Enviar notificaciones push cuando se detecte una señal relevante.

Permitir configurar la frecuencia de alertas (cada 15, 30, 60 minutos).

Compatibilidad y desarrollo:

Lenguaje y framework a elección del agente (por ejemplo, Flutter, React Native, o desarrollo nativo con Swift y Kotlin).

Arquitectura limpia y modular.

Optimización para rendimiento en tiempo real.

Seguridad y legalidad:

Incluir un disclaimer legal claro indicando que las señales son solo sugerencias y no constituyen asesoría financiera.

No almacenar ni solicitar datos financieros del usuario.

💡 Funciones adicionales sugeridas:

Historial de señales y rendimiento estimado.

Backtesting básico de la estrategia.

Personalización de indicadores (periodos, niveles RSI, etc.).

Integración opcional con cuentas demo (solo lectura).

Gamificación o sistema de progreso educativo (por ejemplo, logros por aprender conceptos de análisis técnico).

🧩 Estilo y propósito de la app:

Nombre sugerido: TradeSense, FXMentor, o SignalWave.

Enfoque educativo, claro y transparente.

Objetivo: ayudar a principiantes a entender cómo interpretar señales técnicas, no prometer ganancias.

🔧 Entregables esperados:

Código fuente completo.

Documentación técnica y de instalación.

Manual de usuario.

Diseño visual (UI Kit o mockups).

Pruebas de rendimiento y precisión de señales.

Versión lista para publicación en App Store y Google Play.

💬 Instrucción final para el agente:

Desarrolla esta aplicación con la máxima calidad técnica, claridad visual y valor educativo posible. Prioriza la experiencia del usuario, la precisión de las señales y la escalabilidad del proyecto. Usa buenas prácticas de programación, un diseño moderno y asegúrate de que la app sea intuitiva para traders sin experiencia.
