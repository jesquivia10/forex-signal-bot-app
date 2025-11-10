## Estrategia de pruebas TradeSense

### 1. Pruebas automatizadas
- **Unitarias (Jest):** validan el cálculo de indicadores técnicos (`IndicatorService`), normalización de datos y generación de señales.
- **Componentes (React Native Testing Library):** pendiente de ampliar para tarjetas de señales y pantallas clave.
- Ejecutar con `npm test -- --watchAll=false`.

### 2. Pruebas manuales recomendadas
1. **Flujo inicial:** abrir la app sin API Key y confirmar que se muestran datos simulados.
2. **Actualización manual:** hacer pull-to-refresh en la pantalla *Señales*.
3. **Personalización:** cambiar umbrales de RSI y verificar que las señales cambian tras actualizar.
4. **Historial:** generar dos o más señales y revisar que aparecen en la pestaña historial.
5. **Notificaciones:** habilitar notificaciones, cerrar la app y confirmar recepción (requiere configurar Expo push en entorno real).
6. **Modo oscuro:** alternar el tema y validar colores correctos en todas las pestañas.

### 3. Rendimiento
- El intervalo mínimo de actualización es 15 minutos; se recomienda respetar los límites de la API (Alpha Vantage permite 5 llamadas/min).
- Para pruebas de estrés se puede configurar más pares y periodos cortos usando datos simulados.

### 4. Próximos pasos
- Integrar pruebas de integración para verificar la lógica de generación de señales frente a fixtures conocidos.
- Añadir pruebas end-to-end con Detox para flujos de usuario críticos.
