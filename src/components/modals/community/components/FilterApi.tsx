import React, { useState } from 'react';
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

type FilterApiProps = {
  label?: string;
  withSearch?: boolean;
  items: string[];
  filterName: keyof CommunityDiscoveryInput;
  values?: string[];
  filterValues: CommunityDiscoveryInput;
  changeSomeFilters: (filters: CommunityDiscoveryInput) => void;
};

const itemsShowAtStart = 6;

export const FilterApi: React.FC<FilterApiProps> = ({
  label,
  withSearch,
  items,
  filterName,
  values,
  filterValues,
  changeSomeFilters,
}) => {
  const [isShowAll, setIsShowAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState([...items]);

  if (!items?.length) return null;

  const handleCount = (): void => {
    setIsShowAll(!isShowAll);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = e.target.value.trim();

    setCheckboxes(
      items.filter((item) =>
        item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      ),
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let updatedCheckboxes: string[] = [];
    let updatedValues = { ...filterValues };
    const { value, checked } = event.target;

    if (!values) {
      updatedCheckboxes.push(value);
    } else {
      updatedCheckboxes = checked
        ? [...values, value]
        : values.filter((v) => v !== value);
    }

    if (updatedCheckboxes.length) {
      updatedValues = {
        ...updatedValues,
        [filterName]: [...updatedCheckboxes],
      };
    } else {
      delete updatedValues[filterName];
    }

    changeSomeFilters(updatedValues);
  };

  const buttonText = isShowAll ? 'Show less' : 'See more...';
  const checkboxesToShow = isShowAll
    ? checkboxes
    : checkboxes.slice(0, itemsShowAtStart);

  return (
    <FormGroup sx={{ mb: 2 }}>
      {label && <Typography variant="subtitle2">{label}</Typography>}
      <Box sx={{ mb: 1 }}>
        <Box>
          {withSearch && (
            <TextField
              fullWidth
              placeholder="Search..."
              id="search"
              size="small"
              onChange={handleSearch}
            />
          )}
          <FormGroup>
            {checkboxesToShow.map((checkbox) => (
              <FormControlLabel
                key={checkbox}
                label={checkbox}
                checked={values?.includes(checkbox)}
                value={checkbox}
                control={<Checkbox onChange={handleChange} />}
              />
            ))}
            {checkboxes.length > itemsShowAtStart && (
              <Box>
                <Button
                  variant="text"
                  size="small"
                  color="primary"
                  onClick={handleCount}
                >
                  {buttonText}
                </Button>
              </Box>
            )}
          </FormGroup>
        </Box>
      </Box>
    </FormGroup>
  );
};
