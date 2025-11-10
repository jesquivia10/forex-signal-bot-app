import React from 'react';
import styled from 'styled-components/native';

import { ScreenScroll } from '@presentation/components/ScreenContainer';

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
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

const Paragraph = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
  line-height: 20px;
`;

const ListItem = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const Bullet = styled.Text`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`;

const ListText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 20px;
`;

export default function EducationScreen() {
  return (
    <ScreenScroll>
      <Title>Academia TradeSense</Title>

      <Section>
        <SectionTitle>¿Cómo interpretar las señales?</SectionTitle>
        <Paragraph>
          Cada alerta combina múltiples indicadores técnicos para ayudarte a comprender la
          estructura del mercado. El objetivo es educativo: entender por qué se genera una señal y
          cómo validar tu propia hipótesis antes de tomar una decisión.
        </Paragraph>
        <Paragraph>
          El nivel de confianza es una estimación cualitativa basada en la confluencia de tendencias,
          la fuerza del momentum y la ubicación del precio en las bandas de volatilidad.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Bandas de Bollinger</SectionTitle>
        <Paragraph>
          Las Bandas de Bollinger miden la volatilidad del mercado. La banda central es una media
          móvil y las bandas superior e inferior representan desviaciones estándar.
        </Paragraph>
        <ListItem>
          <Bullet>•</Bullet>
          <ListText>
            Contacto con la banda inferior + RSI en sobreventa = posible rebote alcista.
          </ListText>
        </ListItem>
        <ListItem>
          <Bullet>•</Bullet>
          <ListText>
            Contacto con la banda superior + RSI en sobrecompra = posible corrección bajista.
          </ListText>
        </ListItem>
      </Section>

      <Section>
        <SectionTitle>RSI (Índice de Fuerza Relativa)</SectionTitle>
        <Paragraph>
          El RSI compara la magnitud de los movimientos alcistas y bajistas. Valores por encima de 70
          indican sobrecompra; por debajo de 30, sobreventa.
        </Paragraph>
        <Paragraph>
          Un RSI saliendo de la zona extrema puede confirmar la reversión detectada por las Bandas de
          Bollinger.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Medias móviles</SectionTitle>
        <Paragraph>
          Las medias móviles suavizan el precio para identificar tendencias. Las medias rápidas (20
          periodos) reaccionan antes que las lentas (50 periodos).
        </Paragraph>
        <ListItem>
          <Bullet>•</Bullet>
          <ListText>
            Cruce alcista (media rápida sobre media lenta) refuerza señales de compra.
          </ListText>
        </ListItem>
        <ListItem>
          <Bullet>•</Bullet>
          <ListText>
            Cruce bajista refuerza señales de venta al evidenciar cambio de tendencia.
          </ListText>
        </ListItem>
      </Section>

      <Section>
        <SectionTitle>Checklist antes de operar (Demo)</SectionTitle>
        <ListItem>
          <Bullet>1.</Bullet>
          <ListText>Identifica la tendencia principal en un marco temporal superior.</ListText>
        </ListItem>
        <ListItem>
          <Bullet>2.</Bullet>
          <ListText>Confirma la señal con al menos dos indicadores alineados.</ListText>
        </ListItem>
        <ListItem>
          <Bullet>3.</Bullet>
          <ListText>Define un plan de gestión de riesgo (stop loss & take profit).</ListText>
        </ListItem>
        <ListItem>
          <Bullet>4.</Bullet>
          <ListText>Evalúa la relación beneficio/riesgo mínima de 2:1.</ListText>
        </ListItem>
      </Section>
    </ScreenScroll>
  );
}
