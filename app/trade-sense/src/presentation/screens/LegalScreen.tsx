import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '../components/ScreenContainer';

export function LegalScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer title={t('screens.legal.title')} subtitle={t('screens.legal.subtitle')}>
      <Card mode="outlined" style={styles.card}>
        <Card.Content style={styles.content}>
          <Text variant="titleMedium">{t('screens.legal.disclaimerTitle')}</Text>
          <Text variant="bodyMedium">{t('screens.legal.disclaimerDescription')}</Text>
          <View style={styles.list}>
            <Text variant="bodySmall">• {t('screens.legal.noFinancialAdvice')}</Text>
            <Text variant="bodySmall">• {t('screens.legal.educationalUse')}</Text>
            <Text variant="bodySmall">• {t('screens.legal.dataSources')}</Text>
            <Text variant="bodySmall">• {t('screens.legal.userResponsibility')}</Text>
          </View>
          <Text variant="bodySmall">{t('screens.legal.updatedAt', { date: '2025-11-10' })}</Text>
        </Card.Content>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  content: {
    gap: 12,
  },
  list: {
    gap: 8,
  },
});
