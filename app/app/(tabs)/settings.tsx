import React, { useCallback } from 'react';
import { Switch, TextInput } from 'react-native';
import styled from 'styled-components/native';

import { useAppDispatch, useAppSelector } from '@application/hooks';
import {
  persistPreferences,
  selectPreferences,
  setThemePreference,
  updateIndicatorPreferences,
  updateMonitoredPairs,
  updateNotificationPreferences,
} from '@application/store/preferencesSlice';
import { DEFAULT_CURRENCY_PAIRS, SUPPORTED_INTERVALS } from '@config/tradingPairs';

const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Section = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  gap: 12px;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 600;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
  line-height: 18px;
`;

const OptionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 4px;
`;

const OptionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  flex: 1;
  margin-right: 12px;
`;

const ThemeOptions = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ThemeButton = styled.Pressable<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.divider)};
  background-color: ${({ theme, active }) => (active ? `${theme.colors.accent}22` : 'transparent')};
`;

const ThemeButtonText = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.text)};
  font-weight: 600;
`;

const Input = styled(TextInput)`
  min-width: 70px;
  padding: 8px 12px;
  border-width: 1px;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.colors.divider};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => `${theme.colors.background}AA`};
`;

const PairGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const PairChip = styled.Pressable<{ active: boolean }>`
  padding: 10px 14px;
  border-radius: 12px;
  background-color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.surface)};
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.divider)};
`;

const PairChipText = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) => (active ? '#fff' : theme.colors.text)};
  font-weight: 600;
`;

const IntervalRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const IntervalButton = styled.Pressable<{ active: boolean }>`
  padding: 8px 14px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.divider)};
  background-color: ${({ theme, active }) => (active ? `${theme.colors.accent}22` : 'transparent')};
`;

const IntervalText = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.text)};
  font-weight: 600;
`;

export default function SettingsScreen() {
  const preferences = useAppSelector(selectPreferences);
  const dispatch = useAppDispatch();

  const persist = useCallback(
    (next: typeof preferences) => {
      dispatch(persistPreferences(next));
    },
    [dispatch],
  );

  const handleThemeChange = (theme: typeof preferences.theme) => {
    const next = { ...preferences, theme };
    dispatch(setThemePreference(theme));
    persist(next);
  };

  const handleNotificationToggle = (enabled: boolean) => {
    const next = {
      ...preferences,
      notifications: { ...preferences.notifications, enabled },
    };
    dispatch(updateNotificationPreferences({ enabled }));
    persist(next);
  };

  const handleIntervalChange = (interval: typeof preferences.notifications.intervalMinutes) => {
    const next = {
      ...preferences,
      notifications: { ...preferences.notifications, intervalMinutes: interval },
    };
    dispatch(updateNotificationPreferences({ intervalMinutes: interval }));
    persist(next);
  };

  const handleIndicatorChange = (key: keyof typeof preferences.indicatorPreferences, value: number) => {
    const next = {
      ...preferences,
      indicatorPreferences: { ...preferences.indicatorPreferences, [key]: value },
    };
    dispatch(updateIndicatorPreferences({ [key]: value }));
    persist(next);
  };

  const togglePair = (pair: keyof typeof DEFAULT_CURRENCY_PAIRS) => {
    const currentSet = new Set(preferences.monitoredPairs);
    if (currentSet.has(pair)) {
      currentSet.delete(pair);
    } else {
      currentSet.add(pair);
    }
    const nextPairs = Array.from(currentSet);
    const next = { ...preferences, monitoredPairs: nextPairs };
    dispatch(updateMonitoredPairs(nextPairs));
    persist(next);
  };

  return (
    <Container>
      <Title>Configuración</Title>

      <Section>
        <SectionTitle>Apariencia</SectionTitle>
        <Description>Elige el tema de la aplicación o sincronízalo con el sistema.</Description>
        <ThemeOptions>
          {(['light', 'dark', 'system'] as const).map((theme) => (
            <ThemeButton key={theme} active={preferences.theme === theme} onPress={() => handleThemeChange(theme)}>
              <ThemeButtonText active={preferences.theme === theme}>
                {theme === 'light' ? 'Claro' : theme === 'dark' ? 'Oscuro' : 'Sistema'}
              </ThemeButtonText>
            </ThemeButton>
          ))}
        </ThemeOptions>
      </Section>

      <Section>
        <SectionTitle>Notificaciones</SectionTitle>
        <Description>
          Activa alertas educativas cuando se detecten condiciones relevantes en los pares
          seleccionados.
        </Description>
        <OptionRow>
          <OptionLabel>Notificaciones activas</OptionLabel>
          <Switch
            value={preferences.notifications.enabled}
            onValueChange={handleNotificationToggle}
            thumbColor={preferences.notifications.enabled ? '#2563EB' : undefined}
          />
        </OptionRow>

        <Description>Frecuencia de actualización</Description>
        <IntervalRow>
          {SUPPORTED_INTERVALS.map((interval) => (
            <IntervalButton
              key={interval}
              active={preferences.notifications.intervalMinutes === interval}
              onPress={() => handleIntervalChange(interval)}>
              <IntervalText active={preferences.notifications.intervalMinutes === interval}>
                {interval}
              </IntervalText>
            </IntervalButton>
          ))}
        </IntervalRow>
      </Section>

      <Section>
        <SectionTitle>Indicadores</SectionTitle>
        <Description>Personaliza los parámetros de RSI y medias móviles.</Description>
        <OptionRow>
          <OptionLabel>RSI sobrecompra</OptionLabel>
          <Input
            keyboardType="numeric"
            value={preferences.indicatorPreferences.rsiOverbought.toString()}
            onChangeText={(text) => handleIndicatorChange('rsiOverbought', Number(text) || 0)}
          />
        </OptionRow>
        <OptionRow>
          <OptionLabel>RSI sobreventa</OptionLabel>
          <Input
            keyboardType="numeric"
            value={preferences.indicatorPreferences.rsiOversold.toString()}
            onChangeText={(text) => handleIndicatorChange('rsiOversold', Number(text) || 0)}
          />
        </OptionRow>
        <OptionRow>
          <OptionLabel>SMA rápida (periodos)</OptionLabel>
          <Input
            keyboardType="numeric"
            value={preferences.indicatorPreferences.smaPeriodShort.toString()}
            onChangeText={(text) => handleIndicatorChange('smaPeriodShort', Number(text) || 0)}
          />
        </OptionRow>
        <OptionRow>
          <OptionLabel>SMA lenta (periodos)</OptionLabel>
          <Input
            keyboardType="numeric"
            value={preferences.indicatorPreferences.smaPeriodLong.toString()}
            onChangeText={(text) => handleIndicatorChange('smaPeriodLong', Number(text) || 0)}
          />
        </OptionRow>
        <OptionRow>
          <OptionLabel>EMA rápida (periodos)</OptionLabel>
          <Input
            keyboardType="numeric"
            value={preferences.indicatorPreferences.emaPeriodShort.toString()}
            onChangeText={(text) => handleIndicatorChange('emaPeriodShort', Number(text) || 0)}
          />
        </OptionRow>
        <OptionRow>
          <OptionLabel>EMA lenta (periodos)</OptionLabel>
          <Input
            keyboardType="numeric"
            value={preferences.indicatorPreferences.emaPeriodLong.toString()}
            onChangeText={(text) => handleIndicatorChange('emaPeriodLong', Number(text) || 0)}
          />
        </OptionRow>
      </Section>

      <Section>
        <SectionTitle>Pares monitoreados</SectionTitle>
        <Description>Selecciona los pares de divisas que deseas seguir.</Description>
        <PairGrid>
          {Object.entries(DEFAULT_CURRENCY_PAIRS).map(([pair, info]) => {
            const active = preferences.monitoredPairs.includes(pair as keyof typeof DEFAULT_CURRENCY_PAIRS);
            return (
              <PairChip key={pair} active={active} onPress={() => togglePair(pair as keyof typeof DEFAULT_CURRENCY_PAIRS)}>
                <PairChipText active={active}>{info.label}</PairChipText>
              </PairChip>
            );
          })}
        </PairGrid>
      </Section>

      <Section>
        <SectionTitle>Disclaimer legal</SectionTitle>
        <Description>
          TradeSense es una herramienta educativa. Las señales presentadas no constituyen asesoría
          financiera ni una recomendación de inversión. Utiliza cuentas demo y aplica una gestión de
          riesgo adecuada.
        </Description>
      </Section>
    </Container>
  );
}
