import React from 'react';
import {
  Select as SelectMUI,
  SelectProps as SelectPropsMUI,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { HelperText } from '../helperText/HelperText';
import ErrorTextWrapper from '../errorText/ErrorTextWrapper';

type SelectProps = {
  helperText?: string;
  items: Array<string | number | null>;
  inputLabel?: string;
  name?: string;
  errorText?: string;
} & SelectPropsMUI;

export const Select: React.FC<SelectProps> = ({
  helperText,
  items,
  inputLabel,
  name,
  errorText,
  ...props
}) => (
  <ErrorTextWrapper errorText={errorText}>
    {helperText && <HelperText error={!!errorText}>{helperText}</HelperText>}
    <FormControl fullWidth>
      {inputLabel && <InputLabel id={`${name}-label`}>{inputLabel}</InputLabel>}
      <SelectMUI
        {...props}
        error={!!errorText}
        label={inputLabel}
        labelId={`${name}-label`}
        sx={{ background: '#fff ' }}
      >
        {items.map((item) => (
          <MenuItem value={`${item}`} key={item}>
            {item}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  </ErrorTextWrapper>
);
