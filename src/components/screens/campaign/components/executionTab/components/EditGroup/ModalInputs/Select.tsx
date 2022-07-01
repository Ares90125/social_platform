import React from 'react';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';
import { cohorts, paymentStatusOptions } from '../../../cellsOptions';
import { timeZones } from '../../../../detailsTab/defaultFormValues';
import { CommunityManager } from '../../../../../../../../graphs/getCommunityManagers';
import { InputProps } from './types';

type SelectInputProps = InputProps & {
  communityManagers: CommunityManager[] | undefined;
};
const selectOptions = {
  cohort: cohorts,
  timezone: timeZones,
  paymentStatus: paymentStatusOptions,
};

export const SelectInput: React.FC<SelectInputProps> = ({
  communityManagers,
  currentTab,
  value,
  setValue,
}) => {
  const options =
    currentTab.key === 'сommunityManager'
      ? communityManagers
      : Object.entries(selectOptions).find(
          (option) => option[0] === currentTab.key,
        )![1];
  const handleChange = (e: SelectChangeEvent<string>): void => {
    setValue(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={currentTab.key}>
        {`Select ${currentTab.label}`}
      </InputLabel>
      <Select
        onChange={handleChange}
        value={value}
        labelId={currentTab.key}
        label={`Select ${currentTab.label}`}
      >
        {Array.isArray(options)
          ? options.map((option) => {
              if (typeof option === 'object') {
                const { id, fullname } = option;
                return (
                  <MenuItem value={id} key={id}>
                    {fullname}
                  </MenuItem>
                );
              }
              return (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              );
            })
          : Object.entries(options!).map((option) => {
              const [key, label] = option;
              return (
                <MenuItem value={key} key={key}>
                  {label}
                </MenuItem>
              );
            })}
      </Select>
    </FormControl>
  );
};
