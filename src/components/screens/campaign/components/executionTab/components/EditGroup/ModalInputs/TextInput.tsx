import React from 'react';
import { TextField } from '@mui/material';
import { InputProps } from './types';
import { normalizedNumberInput } from '../../styles';

type TextInputProps = InputProps;

export const TextInput: React.FC<TextInputProps> = ({
  currentTab,
  value,
  setValue,
}) => (
  <TextField
    fullWidth
    value={value}
    type={currentTab.key === 'paymentRemarks' ? 'text' : 'number'}
    onChange={(e): void => setValue(e.target.value)}
    sx={normalizedNumberInput}
  />
);
