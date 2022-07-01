import React from 'react';
import {
  InputAdornment,
  InputBaseComponentProps,
  SxProps,
  Theme,
} from '@mui/material';
import * as IS from './input.styled';
import ErrorTextContainer from '../errorText/ErrorTextWrapper';

type InputProps = Partial<{
  label: React.ReactNode;
  id: string;
  required: boolean;
  icon: React.ReactNode;
  iconPosition: 'start' | 'end';
  adornmentPosition: 'start' | 'end';
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  helperText: string;
  size: 'small' | 'medium';
  placeholder: string;
  helperTextPosition: 'top' | 'bottom';
  errorText?: string;
  min?: string;
  max?: string;
  sx: SxProps<Theme>;
  disabled: boolean;
  htmlInputProps?: InputBaseComponentProps;
  error?: boolean;
  sxInput: SxProps<Theme>;
}>;

export const Input: React.FC<InputProps> = ({
  id,
  label,
  required,
  icon,
  type,
  iconPosition = 'end',
  adornmentPosition = 'end',
  onChange,
  onBlur,
  name,
  value,
  helperText,
  size,
  placeholder,
  helperTextPosition = 'bottom',
  errorText,
  min,
  max,
  sx,
  disabled,
  htmlInputProps,
  error,
  sxInput,
}) => (
  <IS.InputWrapper>
    <IS.FormControl variant="outlined">
      <ErrorTextContainer errorText={errorText} sx={sx}>
        {label && (
          <IS.InputLabel htmlFor={id} error={!!errorText}>
            {label}
          </IS.InputLabel>
        )}
        {helperText && helperTextPosition === 'top' && (
          <IS.FormHelperText error={!!errorText}>
            {helperText}
          </IS.FormHelperText>
        )}
        <IS.OutlinedInput
          id={id}
          required={required}
          label={label}
          startAdornment={
            iconPosition === 'start' && (
              <InputAdornment position={adornmentPosition}>
                {icon}
              </InputAdornment>
            )
          }
          endAdornment={
            iconPosition === 'end' && (
              <InputAdornment position={adornmentPosition}>
                {icon}
              </InputAdornment>
            )
          }
          disabled={disabled}
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={!!errorText || error}
          size={size}
          placeholder={placeholder}
          inputProps={{ min, max, ...htmlInputProps }}
          sx={sxInput}
        />
        {helperText && helperTextPosition === 'bottom' && (
          <IS.FormHelperText error={!!errorText}>
            {helperText}
          </IS.FormHelperText>
        )}
      </ErrorTextContainer>
    </IS.FormControl>
  </IS.InputWrapper>
);
