import React from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { restRadioFilters } from '../filters';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

type RedioFiltersProps = {
  filterValues: CommunityDiscoveryInput;
  changeSomeFilters: (filters: CommunityDiscoveryInput) => void;
};

export const RadioFilters: React.FC<RedioFiltersProps> = ({
  filterValues,
  changeSomeFilters,
}) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedFilters: CommunityDiscoveryInput = { ...filterValues };

    if (e.target.value === '0') {
      delete updatedFilters[e.target.name];
    } else {
      updatedFilters[e.target.name] = e.target.value;
    }

    changeSomeFilters({ ...updatedFilters });
  };

  return (
    <>
      {restRadioFilters.map((filterInfo) => (
        <Box key={filterInfo.label} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">{filterInfo.label}</Typography>
          <RadioGroup
            name={filterInfo.filterName}
            value={filterValues?.[filterInfo.filterName] || 0}
          >
            {filterInfo.data.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio onChange={handleRadioChange} />}
                label={item.displayName}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
    </>
  );
};
