import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { restCheckboxFilters } from '../filters';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

type CheckboxFiltersProps = {
  filterValues: CommunityDiscoveryInput;
  changeSomeFilters: (filters: CommunityDiscoveryInput) => void;
};

export const CheckboxFilters: React.FC<CheckboxFiltersProps> = ({
  filterValues,
  changeSomeFilters,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedFilters: CommunityDiscoveryInput = { ...filterValues };

    if (e.target.checked) {
      updatedFilters[e.target.name] = true;
    } else {
      delete updatedFilters[e.target.name];
    }

    changeSomeFilters({ ...updatedFilters });
  };

  return (
    <>
      {restCheckboxFilters.map((filterInfo) => (
        <FormGroup key={filterInfo.label} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">{filterInfo.label}</Typography>
          <FormGroup>
            {filterInfo.data.map((item) => (
              <FormControlLabel
                key={item.displayName}
                label={item.displayName}
                checked={filterValues?.[item.filterName] || false}
                name={item.filterName}
                control={<Checkbox onChange={handleChange} />}
              />
            ))}
          </FormGroup>
        </FormGroup>
      ))}
    </>
  );
};
