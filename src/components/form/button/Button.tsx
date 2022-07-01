import React from 'react';
import {
  Button as ButtonMUI,
  ButtonProps as ButtonPropsMUI,
} from '@mui/material';

type ButtonProps = Omit<ButtonPropsMUI, 'variant'>;

export const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => (
  <ButtonMUI {...props} variant="contained">
    {children}
  </ButtonMUI>
);

export const ButtonOutlined: React.FC<ButtonProps> = ({
  children,
  ...props
}) => (
  <ButtonMUI {...props} variant="outlined">
    {children}
  </ButtonMUI>
);

export const ButtonText: React.FC<ButtonProps> = ({ children, ...props }) => (
  <ButtonMUI {...props} variant="text">
    {children}
  </ButtonMUI>
);
