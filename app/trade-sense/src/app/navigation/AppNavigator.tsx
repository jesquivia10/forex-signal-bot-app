import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ComponentProps, ComponentType } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DashboardScreen } from '../../presentation/screens/DashboardScreen';
import { EducationScreen } from '../../presentation/screens/EducationScreen';
import { LegalScreen } from '../../presentation/screens/LegalScreen';
import { SettingsScreen } from '../../presentation/screens/SettingsScreen';
import { SignalsHistoryScreen } from '../../presentation/screens/SignalsHistoryScreen';
import { SignalDetailScreen } from '../../presentation/screens/SignalDetailScreen';
import type { RootStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const TAB_ICONS: Record<keyof RootTabParamList, MaterialCommunityIconName> = {
  Dashboard: 'chart-line',
  History: 'history',
  Education: 'school',
  Settings: 'tune',
};

function RootTabs() {
  const theme = useTheme();
  const { t } = useTranslation();

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.outline,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
        borderTopColor: theme.colors.surfaceVariant,
      },
    }),
    [theme],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {Object.keys(TAB_ICONS).map((routeKey) => {
        const tabName = routeKey as keyof RootTabParamList;
        return (
          <Tab.Screen
            key={tabName}
            name={tabName}
            component={TAB_COMPONENTS[tabName]}
            options={{
              title: t(`navigation.${tabName.toLowerCase()}`),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name={TAB_ICONS[tabName]} color={color} size={size} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const TAB_COMPONENTS: Record<keyof RootTabParamList, ComponentType<any>> = {
  Dashboard: DashboardScreen,
  History: SignalsHistoryScreen,
  Education: EducationScreen,
  Settings: SettingsScreen,
};

export function AppNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="SignalDetail"
        component={SignalDetailScreen}
        options={{
          title: t('screens.dashboard.detailTitle'),
        }}
      />
      <Stack.Screen
        name="Legal"
        component={LegalScreen}
        options={{
          title: t('navigation.legal'),
        }}
      />
    </Stack.Navigator>
  );
}
