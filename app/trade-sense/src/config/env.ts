const { EXPO_PUBLIC_ALPHA_VANTAGE_KEY, EXPO_PUBLIC_APP_ENV } = process.env;

export const env = {
  alphaVantageApiKey: EXPO_PUBLIC_ALPHA_VANTAGE_KEY ?? '',
  appEnvironment: EXPO_PUBLIC_APP_ENV ?? 'development',
};

export function hasAlphaVantageKey(): boolean {
  return env.alphaVantageApiKey.length > 0;
}

export function requireAlphaVantageKey(): string {
  if (!hasAlphaVantageKey()) {
    throw new Error(
      'Missing Alpha Vantage API key. Define EXPO_PUBLIC_ALPHA_VANTAGE_KEY in your environment variables.',
    );
  }
  return env.alphaVantageApiKey;
}
