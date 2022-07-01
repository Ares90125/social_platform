import React from 'react';
import { HelperTextWrapper } from './helperText.styled';

type HelperTextProps = {
  error?: boolean;
};

export const HelperText: React.FC<HelperTextProps> = ({ children, error }) => (
  <HelperTextWrapper error={error}>{children}</HelperTextWrapper>
);
