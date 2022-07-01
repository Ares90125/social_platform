import styled from 'styled-components';
import { AppBar, Menu, menuClasses, MenuItem } from '@mui/material';
import { Colors } from '../../utils/enums/colors';
import { ButtonText } from '../form/button/Button';

export const MenuButton = styled(ButtonText)`
  text-transform: none;
  color: ${Colors.BUTTON_TEXT_COLOR};
  font-size: 16px;
  font-weight: 400;

  &:after {
    content: '';
    display: inline-block;
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    margin-left: 10px;
  }
`;

export const LogoWrapper = styled.div`
  p {
    color: #fff;
    font-size: 9px;
    opacity: 0.8;
    text-align: right;
    padding-top: 3px;
    letter-spacing: 0.05em;
    margin: 0;
    padding: 0;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AppBarCustom = styled(AppBar)`
  padding: 0 20px;
  background: ${Colors.HEADER_BG};
  height: 50px;
`;

export const HeaderMenu = styled(Menu)`
  .${menuClasses.paper} {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
      ),
      ${Colors.PRIMARY_1};
    color: ${Colors.WHITE};
  }
`;

export const HeaderLeftPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderRightPart = styled.div``;

export const HeaderMenuListItem = styled(MenuItem)`
  font-size: 14px;
`;

export const MainMenu = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const MainMenuItem = styled.li`
  color: ${Colors.WHITE};
  font-size: 14px;
  color: ${Colors.BUTTON_TEXT_COLOR};
  font-weight: 400;
  position: relative;

  a {
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
  }

  &.active {
    font-weight: 500;
    color: ${Colors.WHITE};

    &:after {
      content: '';
      left: 0;
      bottom: -14px;
      right: 0;
      position: absolute;
      background: #00c98e;
      height: 3px;
    }
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const MainMenuItemIcon = styled.span`
  height: 20px;
  margin-right: 8px;
`;
