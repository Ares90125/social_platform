import React from 'react';
import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { InputProps } from './types';

type DateInputProps = Omit<InputProps, 'currentTab'>;

export const DateInput: React.FC<DateInputProps> = ({ value, setValue }) => {
  const handleChange = (date: any): void => {
    if (!Number.isNaN(Date.parse(date))) {
      setValue(date);
    } else {
      setValue('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        disablePast
        value={value}
        onChange={handleChange}
        renderInput={(props): JSX.Element => <TextField {...props} fullWidth />}
      />
    </LocalizationProvider>
  );
};
