## Instalación y despliegue local

### 1. Prerrequisitos
- Node.js ≥ 18 y npm ≥ 9 (recomendado usar [nvm](https://github.com/nvm-sh/nvm)).
- Dispositivo físico con Expo Go **o** emulador Android/iOS configurado.
- Cuenta gratuita en [Alpha Vantage](https://www.alphavantage.co/support/#api-key) para obtener la API Key.

### 2. Configuración del proyecto
```bash
cd app/trade-sense
npm install
```

### 3. Variables de entorno
Crear un archivo `.env` en `app/trade-sense` con el siguiente contenido:
```env
EXPO_PUBLIC_ALPHA_VANTAGE_KEY=tu_api_key
EXPO_PUBLIC_APP_ENV=development
```

> Las variables que comienzan con `EXPO_PUBLIC_` quedan disponibles en el bundle del cliente. No incluyas información sensible.

### 4. Ejecutar la aplicación
```bash
npm run start         # lanza Metro Bundler
npm run android       # abre Expo Go en Android
npm run ios           # abre Expo Go en iOS (requiere macOS)
npm run web           # vista previa web (usando React Native Web)
```

### 5. Pruebas
```bash
npm run test
```
Las pruebas unitarias cubren el motor de indicadores y la generación de señales, garantizando que los cálculos clave permanezcan estables.

### 6. Compilaciones nativas (opcional)
Se recomienda utilizar [Expo Application Services (EAS)](https://docs.expo.dev/eas/) para generar builds OTA o binarios:
```bash
npx expo login
npx expo install eas-cli
npx eas build --platform android
npx eas build --platform ios
```

### 7. Buenas prácticas adicionales
- Configurar el formateo automático (Prettier) y ESLint si se integran suites de linting.
- Activar notificadores push en Expo siguiendo la [guía oficial](https://docs.expo.dev/push-notifications/overview/).
- Supervisar el uso de la API de Alpha Vantage para evitar bloqueos por exceso de llamadas.
