import styled from 'styled-components';
import { ErrorText, FullWidthButton } from '../../../../form';

export const LoginButton = styled(FullWidthButton)`
  position: relative;
  margin-top: 25px;
`;

export const LoginButtonIcon = styled.div`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

export const LoginErrorText = styled(ErrorText)`
  margin: 15px 0 0;
`;

export const PasswordWrapper = styled.div`
  margin-top: 14px;
`;
