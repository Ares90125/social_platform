import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import ErrorTextWrapper from '../errorText/ErrorTextWrapper';

type DatePickerProps = {
  label?: string;
  id: string;
  onChange: (
    date: React.ChangeEvent<HTMLInputElement> | null,
    keyboardInputValue?: string | undefined,
  ) => void;
  value?: string;
  name: string;
  errorText?: string;
  disabled?: boolean;
};

export const BasicDateTimePicker: React.FC<DatePickerProps> = ({
  label,
  id,
  onChange,
  value,
  name,
  errorText,
  disabled,
}) => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DateTimePicker
      disabled={disabled}
      disablePast
      renderInput={(props): JSX.Element => (
        <ErrorTextWrapper errorText={errorText}>
          <TextField
            {...props}
            sx={{ background: '#fff' }}
            id={id}
            name={name}
            error={false}
            fullWidth
          />
        </ErrorTextWrapper>
      )}
      label={label}
      value={value}
      onChange={onChange}
    />
  </LocalizationProvider>
);
