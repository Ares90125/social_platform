import styled from 'styled-components';
import { Colors } from '../../../utils/enums/colors';

export const LoginPageWrapper = styled.section`
  display: flex;
  min-height: 100vh;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.CONVO_BG};
  flex-direction: column;
`;

export const LoginLogoWrapper = styled.div`
  top: 25px;
  left: 24px;
  width: 100%;
  position: absolute;
  max-width: 130px;
`;

export const LoginIllustrationWrapper = styled.div`
  top: -73px;
  right: 0;
  max-width: 100%;
  position: absolute;
  width: 580px;
`;

export const LoginFormContainer = styled.div`
  max-width: 100%;
  position: relative;
  width: 500px;
  padding: 50px;
  background-color: ${Colors.WHITE};
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
  border-radius: 10px;
`;

export const LoginFormHeader = styled.div`
  text-align: center;
  margin: 0 12px;

  h1 {
    color: ${Colors.PRIMARY_1};
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 700;
    line-height: 33px;
  }

  p {
    color: rgba(51, 51, 79, 0.7);
    margin: 0 0 30px;
    font-size: 15px;
    line-height: 22px;
  }
`;

export const LoginFormContent = styled.div``;

export const TooltipText = styled.p`
  color: ${Colors.WHITE};
  padding: 12px;
  font-size: 13px;
  text-align: center;
  font-weight: 400;
  line-height: 16px;
  margin: 0;
`;

export const RequestAccessWrapper = styled.div`
  box-shadow: 0 2px 10px #0000001a;
  border-radius: 10px;
  padding: 23px;
  width: 100%;
  max-width: 500px;
  color: #33334fb3;
  font-size: 15px;
  background: #fff;
  text-align: center;
  margin: 30px auto;

  a {
    color: ${Colors.EMP_BLUE_1};
    padding-left: 5px;
  }
`;
