import React from 'react';
import { ChipsWrapper } from './chips.styled';
import { ChipsProps } from './chips.types';

export const Chips: React.FC<ChipsProps> = ({ children, offset }) => (
  <ChipsWrapper offset={offset}>{children}</ChipsWrapper>
);
