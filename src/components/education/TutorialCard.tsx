import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { useTheme } from '@hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TutorialCardProps {
  title: string;
  content: string;
  icon?: string;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ title, content, icon = 'school' }) => {
  const { theme } = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={icon as any}
          size={28}
          color={theme.colors.primary}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      </View>
      <Text style={[styles.content, { color: theme.colors.textSecondary }]}>{content}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});
