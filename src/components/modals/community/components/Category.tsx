import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Keyword, listKeywords } from '../../../../graphs/keywords';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

type CategoryProps = {
  values: CommunityDiscoveryInput;
  changeFilter: (filters: CommunityDiscoveryInput) => void;
};

const getCategories = (keywords?: Keyword[]): string[] => {
  const categories = _.uniq(
    keywords?.map((keyword) => keyword.category),
  )?.filter((category) => typeof category === 'string') as string[];

  return categories;
};

const itemsToShowAtStart = 6;

export const Category: React.FC<CategoryProps> = ({ values, changeFilter }) => {
  const { data: keywords } = useQuery('keywords', () => listKeywords());
  const categoriesApi = getCategories(keywords);
  const [isShowAll, setIsShowAll] = useState(false);
  const [categories, setCategories] = useState(getCategories(keywords));

  useEffect(() => {
    setCategories(getCategories(keywords));
  }, [keywords]);

  if (!categoriesApi?.length) return null;

  const handleCount = (): void => {
    setIsShowAll(!isShowAll);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = e.target.value.trim();

    setCategories(
      categoriesApi.filter((category) =>
        category.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      ),
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;
    const updateValues = { ...values };
    let selectedCategories = updateValues?.category || [];

    if (checked) {
      selectedCategories.push(value);
    } else {
      selectedCategories = selectedCategories.filter((c) => c !== value);
    }

    if (selectedCategories.length) {
      updateValues.category = [...selectedCategories];
    } else {
      delete updateValues.category;
    }

    changeFilter({ ...updateValues });
  };

  const buttonText = isShowAll ? 'Show less' : 'See more...';
  const categoriesToShow = isShowAll
    ? categories
    : categories.slice(0, itemsToShowAtStart);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        Category
      </Typography>
      <Box>
        <TextField
          fullWidth
          placeholder="Search..."
          id="search"
          size="small"
          onChange={handleSearch}
        />
        <FormGroup>
          {categoriesToShow.map((category) => (
            <FormControlLabel
              key={category}
              label={category}
              checked={(values.category || []).includes(category)}
              value={category}
              control={<Checkbox onChange={handleChange} />}
            />
          ))}
          {categories.length > itemsToShowAtStart && (
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
  );
};
