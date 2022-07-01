import styled from 'styled-components';

export const TabPannelWrapper = styled.div<{ isFullWidth?: boolean }>`
  height: 100%;
  padding: 30px 15px;
  max-width: ${({ isFullWidth }): string => (isFullWidth ? 'none' : '1140px')};
  margin: 0 auto;
`;
