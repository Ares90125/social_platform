import styled, { keyframes } from 'styled-components';
import { CircleProps, SpinnerWrapperProps } from './spinner.types';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  display: flex;
  align-items: center;
  margin: 0;
  height: 30px;
`;

export const Circle = styled.div<CircleProps>`
  width: 30px;
  height: 30px;
  margin: 0 auto;
  animation: ${rotate} 1s linear infinite;
  background-color: transparent;
  border: 3px solid #f6f4f8;
  border-top-color: #3654ff;
  border-radius: 50%;
`;
