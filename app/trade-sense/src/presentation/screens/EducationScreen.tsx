import { StyleSheet, View } from 'react-native';
import { Button, Card, List, ProgressBar, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '../components/ScreenContainer';

const MODULES = [
  {
    id: 'bollinger',
    titleKey: 'screens.education.modules.bollinger.title',
    descriptionKey: 'screens.education.modules.bollinger.description',
    progress: 0.45,
  },
  {
    id: 'rsi',
    titleKey: 'screens.education.modules.rsi.title',
    descriptionKey: 'screens.education.modules.rsi.description',
    progress: 0.2,
  },
  {
    id: 'movingAverages',
    titleKey: 'screens.education.modules.ma.title',
    descriptionKey: 'screens.education.modules.ma.description',
    progress: 0.65,
  },
];

export function EducationScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer
      title={t('screens.education.title')}
      subtitle={t('screens.education.subtitle')}
      headerAccessory={<Button mode="contained">{t('screens.education.startCourse')}</Button>}
    >
      <Card mode="outlined">
        <Card.Title title={t('screens.education.quickStartTitle')} />
        <Card.Content>
          <Text variant="bodyMedium">{t('screens.education.quickStartDescription')}</Text>
          <List.Section>
            <List.Item title={t('screens.education.riskManagement')} left={(props) => <List.Icon {...props} icon="shield-check" />} />
            <List.Item title={t('screens.education.readingSignals')} left={(props) => <List.Icon {...props} icon="chart-line" />} />
            <List.Item title={t('screens.education.createPlan')} left={(props) => <List.Icon {...props} icon="clipboard-text" />} />
          </List.Section>
        </Card.Content>
      </Card>

      <View style={styles.modules}>
        {MODULES.map((module) => (
          <Card key={module.id} mode="elevated" style={styles.moduleCard}>
            <Card.Title title={t(module.titleKey)} />
            <Card.Content style={styles.moduleContent}>
              <Text variant="bodyMedium">{t(module.descriptionKey)}</Text>
              <ProgressBar progress={module.progress} style={styles.progress} />
              <Button mode="text">{t('screens.education.continue')}</Button>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  modules: {
    gap: 16,
  },
  moduleCard: {
    borderRadius: 16,
  },
  moduleContent: {
    gap: 12,
  },
  progress: {
    height: 8,
    borderRadius: 8,
  },
});
