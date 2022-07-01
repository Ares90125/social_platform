import styled from 'styled-components';
import {
  Tabs as TabsMUI,
  Tab as TabMUI,
  tabClasses,
  tabsClasses,
} from '@mui/material';
import { Colors } from '../../utils/enums/colors';

export const TabsWrapper = styled.div`
  width: 100%;
`;

export const TabsListWrapper = styled.div<{ sticky?: boolean }>`
  padding: 24px 0 0;
  border-bottom: 1px solid ${Colors.PRIMARY_3};
  background: ${Colors.WHITE};
  position: ${({ sticky }): string => (sticky ? 'sticky' : 'static')};
  top: ${({ sticky }): string => (sticky ? '30px' : 'auto')};
  z-index: 1;
`;

export const Tabs = styled(TabsMUI) <{ isFullWidth?: boolean }>`
  max-width: ${({ isFullWidth }): string => (isFullWidth ? 'none' : '1140px')};
  margin: 0 auto 0;
  padding: 0 15px;

  & .${tabsClasses.indicator} {
    background-color: ${Colors.EMP_BLUE_1};
    height: 3px;
  }
`;

export const Tab = styled(TabMUI)`
  color: ${Colors.PRIMARY_1};
  text-transform: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-top: 5px;
  padding-bottom: 5px;

  &.${tabClasses.selected} {
    font-weight: 500;
    color: ${Colors.EMP_BLUE_1};
  }
`;
