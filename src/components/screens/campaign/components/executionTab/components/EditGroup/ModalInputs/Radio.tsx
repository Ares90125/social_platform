import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { cohorts } from '../../../cellsOptions';
import { InputProps } from './types';

type RadioInputProps = InputProps;

const radioOptions = {
  cohort: cohorts,
  modeOfCommunication: ['Email', 'WhatsApp'],
};
export const RadioInput: React.FC<RadioInputProps> = ({
  currentTab,
  value,
  setValue,
}) => {
  const options = Object.entries(radioOptions).find(
    (item) => item[0] === currentTab.key,
  )![1];

  return (
    <FormControl>
      <FormLabel id={currentTab.key}>
        Pick the preferred {currentTab.label.toLowerCase()} for selected groups
      </FormLabel>
      <RadioGroup
        value={value}
        onChange={(e): void => setValue(e.target.value)}
        aria-labelledby={currentTab.key}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
