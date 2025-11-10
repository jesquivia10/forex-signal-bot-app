import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 32px 20px;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Paragraph = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 12px;
`;

export default function ModalScreen() {
  return (
    <Container>
      <Title>Sobre TradeSense</Title>
      <Paragraph>
        TradeSense es una aplicación educativa que combina Bandas de Bollinger, RSI y medias
        móviles para ayudarte a interpretar oportunidades en el mercado Forex. Las señales no deben
        considerarse como asesoría financiera.
      </Paragraph>
      <Paragraph>
        Utiliza cuentas demo, compara con otros marcos temporales y valida siempre con tu propio
        análisis. Nuestro objetivo es que aprendas a identificar patrones y a construir disciplina
        en tu proceso de trading.
      </Paragraph>
    </Container>
  );
}
