import React from 'react';
import Image from 'next/image';
import { NoBrandsFoundWrapper } from './noBrandsFound.styled';
import { Button } from '../../../../form';

type NoBrandsFoundProps = {
  searchValue: string;
};

export const NoBrandsFound: React.FC<NoBrandsFoundProps> = ({
  searchValue,
}) => (
  <NoBrandsFoundWrapper>
    <figure>
      <Image src="/icons/star-emoji.svg" alt="star" width={72} height={72} />
    </figure>
    <h3>No matches for “{searchValue}”</h3>
    <h4>Would you like to create a new brand instead?</h4>
    <a href={`/create-brand?brand=${searchValue}`}>
      <Button>Create a brand</Button>
    </a>
  </NoBrandsFoundWrapper>
);
