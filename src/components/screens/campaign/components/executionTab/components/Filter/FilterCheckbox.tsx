import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import { styles } from './Filter.styles';
import { ActiveFilters } from './Filter';

type FilterCheckboxProps = {
  value: string;
  label:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  filter: string;
  activeFilters: ActiveFilters;
  handleChange: (value: string, filter: string) => void;
};
export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  value,
  label,
  filter,
  activeFilters,
  handleChange,
}) => (
  <Box>
    <FormControlLabel
      sx={styles.checkboxWrapper}
      control={
        <Checkbox
          value={value}
          onChange={(e): void => {
            handleChange(e.target.value, filter);
          }}
          checked={activeFilters[filter].includes(value)}
        />
      }
      label={label}
    />
  </Box>
);
