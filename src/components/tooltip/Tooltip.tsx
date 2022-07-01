import React from 'react';
import {
  TooltipProps as TooltipPropsMUI,
  Tooltip as TooltipMUI,
} from '@mui/material';
import { StylizedPopper } from './tooltip.styled';

type TooltipProps = Omit<TooltipPropsMUI, 'PopperProps'>;

export const Tooltip: React.FC<TooltipProps> = (props) => (
  <TooltipMUI {...props} PopperComponent={StylizedPopper} />
);
