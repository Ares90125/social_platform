import styled from 'styled-components';
import { Colors } from '../../../utils/enums/colors';
import { ButtonPrimary, ButtonText } from './Button';

export const Button = styled(ButtonPrimary)`
  text-transform: none;
  background: ${Colors.EMP_BLUE_1};
  box-shadow: none !important;
  padding: 6px 16px;

  &:hover {
    background: ${Colors.EMP_BLUE_2};
  }

  &:disabled {
    color: ${Colors.WHITE};
    border-color: ${Colors.BLACK_40};
    background-color: ${Colors.BLACK_40};
    cursor: not-allowed;
  }
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  height: 56px;
`;
export const ButtonOutlined = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  border: 1px solid #e0e0e5;
  background: transparent;
  color: #000;

  &:hover {
    background: transparent;
    border-color: ${Colors.BLACK_40};
  }
`;

export const EmptyButton = styled(ButtonText)`
  text-transform: none;
  color: #33334fb3;
  height: auto;
  font-size: 14px;
  line-height: 16px;
  background-color: transparent;
  border-bottom: 1.5px dotted rgba(51, 51, 79, 0.7);
  border-radius: 0;
  font-weight: 400;
`;

export const SecondaryButton = styled(ButtonText)`
  text-transform: none;
  color: #33334f;
  background-color: #ebebed;
  padding: 6px 16px;
  &:hover {
    background: #e1e1e1;
  }

  &:disabled {
    color: #33334f;
    background-color: #f9f9f9;
    border-color: inheirt;
  }
`;

export const IconButton40X40 = styled(ButtonText)`
  text-transform: none;
  color: #33334f;
  background-color: #ebebed;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  min-width: 40px;
  svg {
    width: 20px;
  }
  &:hover {
    background: #e1e1e1;
  }

  &:disabled {
    color: #33334f;
    background-color: #f9f9f9;
    border-color: inheirt;
  }
`;
