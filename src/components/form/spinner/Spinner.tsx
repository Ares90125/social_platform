import React from 'react';
import { SpinnerWrapper, Circle } from './spinner.styled';
import { SpinnerProps } from './spinner.types';

export const Spinner: React.FC<SpinnerProps> = ({
  spinnerWrapperProps,
  circleProps,
}) => (
  <SpinnerWrapper {...spinnerWrapperProps}>
    <Circle {...circleProps} />
  </SpinnerWrapper>
);
