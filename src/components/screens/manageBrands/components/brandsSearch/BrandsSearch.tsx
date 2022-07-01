import React from 'react';
import { Search } from '@mui/icons-material';
import { Input } from '../../../../form';
import { BrandsSearchWrapper } from './brandsSearch.styled';
import { SearchResults } from '../searchResults/SearchResults';
import { BrandSchema } from '../../../../../api/Brand/BrandSchema';

type BrandsSearchProps = {
  searchValue: string;
  brands: BrandSchema[];
  updateBrands: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BrandsSearch: React.FC<BrandsSearchProps> = ({
  brands,
  searchValue,
  updateBrands,
}) => (
  <BrandsSearchWrapper>
    <Input
      id="brands-search"
      placeholder="Search..."
      size="small"
      icon={<Search />}
      adornmentPosition="start"
      iconPosition="start"
      onChange={updateBrands}
      value={searchValue}
    />
    <SearchResults brands={brands} searchValue={searchValue} />
  </BrandsSearchWrapper>
);
