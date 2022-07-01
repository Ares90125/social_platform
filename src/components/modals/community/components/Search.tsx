import React, { useState } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

type SearchProps = {
  values: CommunityDiscoveryInput;
  changeFilter: (
    filterName: keyof CommunityDiscoveryInput,
    value: CommunityDiscoveryInput[typeof filterName],
  ) => void;
  changeSomeFilters: (filters: CommunityDiscoveryInput) => void;
};

export const Search: React.FC<SearchProps> = ({
  values,
  changeFilter,
  changeSomeFilters,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e?.key === 'Enter' && searchValue.length) {
      changeFilter('searchTerm', searchValue);
    }

    if (!searchValue.length) {
      const { searchTerm, ...otherFilters } = values;
      changeSomeFilters({ ...otherFilters });
    }
  };

  return (
    <OutlinedInput
      id="search-community"
      size="small"
      placeholder="Group name, description and facebook ID"
      value={searchValue}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
