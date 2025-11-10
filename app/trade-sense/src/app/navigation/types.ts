import type { Signal } from '../../domain/entities';

export type RootTabParamList = {
  Dashboard: undefined;
  History: undefined;
  Education: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Root: undefined;
  Legal: undefined;
  SignalDetail: { signal: Signal };
};
