import React from 'react';
import Link from 'next/link';
import { BrandSchema } from '../../../../../api/Brand/BrandSchema';
import {
  SearchResultsItem,
  SearchResultsList,
  SearchResultsWrapper,
} from './searchResults.styled';

type SearchResultsProps = {
  searchValue: string;
  brands: BrandSchema[];
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  brands,
  searchValue,
}) =>
  searchValue ? (
    <SearchResultsWrapper>
      <SearchResultsList>
        {brands.map(({ name, id }) => (
          <SearchResultsItem key={id}>
            <Link href={`/brands/${id}`}>
              <a>{name}</a>
            </Link>
          </SearchResultsItem>
        ))}
        <SearchResultsItem primary>
          <Link href={`/create-brand?brand=${searchValue}`}>
            <a>+ Create new brand {searchValue}</a>
          </Link>
        </SearchResultsItem>
      </SearchResultsList>
    </SearchResultsWrapper>
  ) : null;
