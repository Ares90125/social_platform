import React from 'react';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { InputProps } from './types';
import { currencies } from '../../../cellsOptions';
import { normalizedNumberInput } from '../../styles';

type PricingInputProps = Omit<InputProps, 'currentTab'> & {
  additionalValue: string;
  setAdditionalValue: React.Dispatch<React.SetStateAction<string>>;
};

export const PricingInput: React.FC<PricingInputProps> = ({
  value,
  additionalValue,
  setValue,
  setAdditionalValue,
}) => (
  <Box sx={{ display: 'flex' }}>
    <FormControl fullWidth sx={{ maxWidth: '145px', marginRight: '16px' }}>
      <InputLabel id="currency">Currency</InputLabel>
      <Select
        labelId="currency"
        value={additionalValue}
        label="Currency"
        onChange={(e): void => setAdditionalValue(e.target.value)}
      >
        {Object.keys(currencies).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      fullWidth
      value={value}
      label="Price"
      type="number"
      onChange={(e): void => setValue(e.target.value)}
      sx={normalizedNumberInput}
    />
  </Box>
);
