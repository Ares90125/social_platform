import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/lab';

import ErrorTextWrapper from '../errorText/ErrorTextWrapper';

type BasicDatePickerProps = {
  label?: string;
  id: string;
  onChange: (
    date: React.ChangeEvent<HTMLInputElement> | null,
    keyboardInputValue?: string | undefined,
  ) => void;
  value: string;
  name: string;
  errorText?: string;
  disabled?: boolean;
  open?: boolean;
};

export const BasicDatePicker: React.FC<BasicDatePickerProps> = ({
  label,
  id,
  onChange,
  value,
  name,
  errorText,
  disabled,
  open,
}) => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      open={open}
      disabled={disabled}
      disablePast
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params): JSX.Element => (
        <ErrorTextWrapper errorText={errorText}>
          <TextField
            {...params}
            disabled={errorText ? false : disabled}
            id={id}
            error={!!errorText}
            name={name}
            fullWidth
          />
        </ErrorTextWrapper>
      )}
    />
  </LocalizationProvider>
);
