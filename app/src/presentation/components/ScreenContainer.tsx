import styled from 'styled-components/native';

export const ScreenScroll = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  padding-bottom: 32px;
`;

export const ScreenView = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
