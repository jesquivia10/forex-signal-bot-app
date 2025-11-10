import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { TutorialCard } from '@components/education/TutorialCard';
import { IndicatorExplanation } from '@components/education/IndicatorExplanation';
import { INDICATOR_EXPLANATIONS, TRADING_EDUCATION } from '@config/constants';

export default function EducationScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md }}
    >
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Trading Fundamentals
      </Text>
      {TRADING_EDUCATION.map((item) => (
        <TutorialCard key={item.id} title={item.title} content={item.content} />
      ))}

      <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: theme.spacing.lg }]}>
        Technical Indicators
      </Text>
      <IndicatorExplanation
        title={INDICATOR_EXPLANATIONS.RSI.title}
        description={INDICATOR_EXPLANATIONS.RSI.description}
        interpretation={INDICATOR_EXPLANATIONS.RSI.interpretation}
        formula={INDICATOR_EXPLANATIONS.RSI.formula}
      />
      <IndicatorExplanation
        title={INDICATOR_EXPLANATIONS.BOLLINGER_BANDS.title}
        description={INDICATOR_EXPLANATIONS.BOLLINGER_BANDS.description}
        interpretation={INDICATOR_EXPLANATIONS.BOLLINGER_BANDS.interpretation}
        formula={INDICATOR_EXPLANATIONS.BOLLINGER_BANDS.formula}
      />
      <IndicatorExplanation
        title={INDICATOR_EXPLANATIONS.MOVING_AVERAGES.title}
        description={INDICATOR_EXPLANATIONS.MOVING_AVERAGES.description}
        interpretation={INDICATOR_EXPLANATIONS.MOVING_AVERAGES.interpretation}
        formula={INDICATOR_EXPLANATIONS.MOVING_AVERAGES.formula}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});
