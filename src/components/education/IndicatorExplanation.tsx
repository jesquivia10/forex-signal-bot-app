import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../common/Card';
import { useTheme } from '@hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IndicatorExplanationProps {
  title: string;
  description: string;
  interpretation: string;
  formula: string;
}

export const IndicatorExplanation: React.FC<IndicatorExplanationProps> = ({
  title,
  description,
  interpretation,
  formula,
}) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.7}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={theme.colors.text}
          />
        </View>
      </TouchableOpacity>

      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        {description}
      </Text>

      {expanded && (
        <>
          <View style={[styles.section, { marginTop: theme.spacing.md }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              How to Interpret:
            </Text>
            <Text style={[styles.sectionContent, { color: theme.colors.textSecondary }]}>
              {interpretation}
            </Text>
          </View>

          <View
            style={[
              styles.formulaBox,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.sm,
                marginTop: theme.spacing.md,
                padding: theme.spacing.sm,
              },
            ]}
          >
            <Text style={[styles.formulaTitle, { color: theme.colors.text }]}>Formula:</Text>
            <Text style={[styles.formula, { color: theme.colors.textSecondary }]}>{formula}</Text>
          </View>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {},
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 13,
    lineHeight: 19,
  },
  formulaBox: {},
  formulaTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  formula: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});
