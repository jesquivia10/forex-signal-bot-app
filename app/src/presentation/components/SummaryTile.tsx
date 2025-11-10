import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-basis: 30%;
  min-width: 110px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 16px;
  margin-right: 0px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 4px;
  letter-spacing: 1px;
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 700;
`;

interface Props {
  label: string;
  value: string;
}

export const SummaryTile: React.FC<Props> = ({ label, value }) => (
  <Container>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </Container>
);
