import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { useAppSelector } from '@application/hooks';
import { selectSignalHistory } from '@application/store/signalsSlice';
import { SignalCard } from '@presentation/components/SignalCard';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: 24px 16px 8px 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 8px;
  font-size: 14px;
`;

const EmptyState = styled.View`
  margin: 32px;
  padding: 24px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
`;

export default function HistoryScreen() {
  const history = useAppSelector(selectSignalHistory);

  return (
    <Container>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Header>
            <Title>Historial de señales</Title>
            <Subtitle>Consulta el rendimiento histórico y revisa las alertas anteriores.</Subtitle>
          </Header>
        }
        renderItem={({ item }) => <SignalCard signal={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ListEmptyComponent={
          <EmptyState>
            <EmptyText>Todavía no has generado señales. ¡Regresa al dashboard para iniciar!</EmptyText>
          </EmptyState>
        }
      />
    </Container>
  );
}
