import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const alphaVantageApiKey =
    process.env.EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY ?? config?.extra?.alphaVantageApiKey ?? '';

  return {
    ...config,
    name: 'TradeSense',
    slug: 'tradesense',
    extra: {
      ...config.extra,
      alphaVantageApiKey,
    },
  };
};
