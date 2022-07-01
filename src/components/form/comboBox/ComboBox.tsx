import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import { Spinner } from '../spinner/Spinner';

type ComboBoxType<T> = {
  value?: T;
  options: T[];
  label?: string;
  keyField?: string;
  isLoading?: boolean;
  labelField?: string;
  isDisabled?: boolean;
  size?: 'small' | 'medium';
  handleChange: (newValue: T) => void;
};

export function ComboBox<T>({
  options,
  size = 'small',
  label,
  value,
  handleChange,
  isLoading,
  labelField = 'name',
  keyField = 'id',
  isDisabled,
}: ComboBoxType<T>): React.ReactElement {
  const [inputValue, setInputValue] = useState(value?.[labelField] || '');

  return (
    <Box sx={{ position: 'relative' }}>
      <Autocomplete<T>
        size={size}
        value={value}
        options={options}
        disabled={isLoading || isDisabled}
        inputValue={inputValue}
        className="comboBox_wrap"
        getOptionLabel={(option: T): string => option?.[labelField] || ''}
        onChange={(_, newValue: T | null): void => {
          if (newValue !== null) {
            handleChange(newValue);
          }
        }}
        onInputChange={(_, newInputValue): void => {
          setInputValue(newInputValue);
        }}
        renderInput={(params): React.ReactNode => (
          <TextField {...params} label={label} />
        )}
        renderOption={(props, option): React.ReactNode => (
          <li {...props} key={option[keyField]}>
            {option[labelField]}
          </li>
        )}
      />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, .7)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Spinner
            spinnerWrapperProps={{
              style: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
