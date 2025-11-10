import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useSettingsStore } from '@store/settingsStore';
import { useThemeStore } from '@store/themeStore';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MAJOR_PAIRS } from '@core/constants/currencyPairs';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { mode, toggleTheme } = useThemeStore();
  const settings = useSettingsStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
      }}
    >
      {/* Appearance */}
      <Card style={{ marginBottom: theme.spacing.md }}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <View>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                {mode === 'dark' ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
          />
        </View>
      </Card>

      {/* Notifications */}
      <Card style={{ marginBottom: theme.spacing.md }}>
        <TouchableOpacity onPress={() => toggleSection('notifications')}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                Notifications
              </Text>
            </View>
            <MaterialCommunityIcons
              name={expandedSection === 'notifications' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.text}
            />
          </View>
        </TouchableOpacity>

        {expandedSection === 'notifications' && (
          <View style={{ marginTop: theme.spacing.md }}>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: theme.colors.textSecondary }]}>
                Enable Notifications
              </Text>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) => settings.updateSettings({ notificationsEnabled: value })}
                trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
              />
            </View>

            <View style={[styles.inputGroup, { marginTop: theme.spacing.md }]}>
              <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                Update Interval (minutes)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={settings.updateInterval.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 15;
                  settings.updateSettings({ updateInterval: value });
                }}
                keyboardType="number-pad"
              />
            </View>
          </View>
        )}
      </Card>

      {/* Indicator Settings */}
      <Card style={{ marginBottom: theme.spacing.md }}>
        <TouchableOpacity onPress={() => toggleSection('indicators')}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons
                name="chart-bell-curve-cumulative"
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                Indicator Settings
              </Text>
            </View>
            <MaterialCommunityIcons
              name={expandedSection === 'indicators' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.text}
            />
          </View>
        </TouchableOpacity>

        {expandedSection === 'indicators' && (
          <View style={{ marginTop: theme.spacing.md }}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                RSI Period
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={settings.rsiPeriod.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 14;
                  settings.updateSettings({ rsiPeriod: value });
                }}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                RSI Overbought Level
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={settings.rsiOverbought.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 70;
                  settings.updateSettings({ rsiOverbought: value });
                }}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                RSI Oversold Level
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={settings.rsiOversold.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 30;
                  settings.updateSettings({ rsiOversold: value });
                }}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                Bollinger Bands Period
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={settings.bbPeriod.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 20;
                  settings.updateSettings({ bbPeriod: value });
                }}
                keyboardType="number-pad"
              />
            </View>
          </View>
        )}
      </Card>

      {/* Currency Pairs */}
      <Card style={{ marginBottom: theme.spacing.md }}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={24}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Monitored Pairs
            </Text>
          </View>
        </View>
        <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary, marginTop: 8 }]}>
          {settings.favoritePairs.join(', ')}
        </Text>
      </Card>

      {/* Reset */}
      <Button
        title="Reset to Defaults"
        onPress={settings.resetToDefaults}
        variant="outline"
        style={{ marginTop: theme.spacing.md }}
      />

      <Text style={[styles.version, { color: theme.colors.textSecondary, marginTop: theme.spacing.lg }]}>
        TradeSense v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  settingLabel: {
    fontSize: 14,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 24,
  },
});
