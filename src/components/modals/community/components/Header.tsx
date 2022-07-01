import React from 'react';
import _ from 'lodash';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Tag } from '../../../ui';
import { Search } from './Search';
import { initialFilterValues } from '../filters';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

type HeaderProps = {
  filterValues: CommunityDiscoveryInput;
  changeFilter: (
    filterName: keyof CommunityDiscoveryInput,
    value: CommunityDiscoveryInput[typeof filterName],
  ) => void;
  changeSomeFilters: (filters: CommunityDiscoveryInput) => void;
  totalItems: number;
};
type FilterOption = { [key: string]: string };

const filterOptions: FilterOption[] = [
  { category: 'Category' },
  { businessCategory: 'Business Category' },
  { country: 'Group location (country)' },
  { region: 'Region' },
  { owner: 'BD or Non-BD' },
  { privacy: 'Group type' },
  { monetizationState: 'Monetizable vs Non-monetizable' },
  { state: 'Group state' },
];

export const Header: React.FC<HeaderProps> = ({
  filterValues,
  changeFilter,
  changeSomeFilters,
  totalItems,
}) => {
  const resetFilters = (): void => {
    changeSomeFilters({ ...initialFilterValues });
  };

  const handleSort = (e: SelectChangeEvent<string>): void => {
    changeFilter('sortBy', e.target.value);
  };

  const getFilterTags = (
    filterValue: string[] | undefined,
    options: FilterOption,
  ): JSX.Element[] | null => {
    const [[option, name]] = Object.entries(options);

    if (filterValue) {
      const FilterTags = filterValue.map((item: string) => {
        const handleRemove = (): void => {
          const filtered = filterValues[option].filter(
            (c: string) => c !== item,
          ) as string[];
          if (filtered.length) {
            changeSomeFilters({
              ...filterValues,
              [option]: [...filtered],
            });
          } else {
            const tempFiltered = { ...filterValues };
            delete tempFiltered[option];
            changeSomeFilters(tempFiltered);
          }
        };
        return (
          <Tag key={item} label={`${name}: ${item}`} onClick={handleRemove} />
        );
      });
      return FilterTags;
    }
    return null;
  };

  return (
    <>
      {!_.isEqual(initialFilterValues, filterValues) && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: '16px', my: 2 }}>
          <Tag label="Clear all filters" onClick={resetFilters} />
          {filterOptions.map((option) =>
            getFilterTags(filterValues[Object.keys(option)[0]], option),
          )}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Showing {totalItems} communities
        </Typography>

        <Box>
          <Select
            value={filterValues.sortBy}
            onChange={handleSort}
            size="small"
            sx={{ mr: 4 }}
          >
            <MenuItem value="memberCount">Member count</MenuItem>
            <MenuItem value="campaignPostEngagementRateLastNinetyDays">
              Campaign Engagement
            </MenuItem>
            <MenuItem value="postsEngagementRateLastNinetyDays">
              Post Engagement
            </MenuItem>
            <MenuItem value="categoryDensity">Category density</MenuItem>
          </Select>
          <Search
            values={filterValues}
            changeFilter={changeFilter}
            changeSomeFilters={changeSomeFilters}
          />
        </Box>
      </Box>
    </>
  );
};
