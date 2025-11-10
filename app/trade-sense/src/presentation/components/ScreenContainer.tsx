import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type ScreenContainerProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  headerAccessory?: ReactNode;
}>;

export function ScreenContainer({ title, subtitle, children, headerAccessory }: ScreenContainerProps) {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
              {title}
            </Text>
            {subtitle ? (
              <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          {headerAccessory}
        </View>
        <View style={styles.body}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    gap: 8,
  },
  subtitle: {
    lineHeight: 20,
  },
  body: {
    flexGrow: 1,
    gap: 20,
  },
});
