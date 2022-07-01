import styled from 'styled-components';
import { Colors } from '../../../utils/enums/colors';

export const MainWrapper = styled.main`
  margin: 50px auto 0;
  min-height: calc(100vh - 50px);
  background: ${Colors.CONVO_BG};
`;

export const TopSectionWrapper = styled.div`
  padding: 32px 0 0;
  background: ${Colors.WHITE};
  position: relative;
  z-index: 1;
`;
