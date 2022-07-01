import Link from 'next/link';
import React from 'react';
import { BrandSchema } from '../../../../../api/Brand/BrandSchema';
import { BrandImage, BrandItemWrapper, BrandName } from './brandItem.styled';

export const BrandItem: React.FC<BrandSchema> = ({ iconUrl, name, id }) => (
  <Link href={`/brands/${id}`}>
    <a>
      <BrandItemWrapper>
        <BrandImage>{iconUrl && <img src={iconUrl} alt={name} />}</BrandImage>
        <BrandName>{name}</BrandName>
      </BrandItemWrapper>
    </a>
  </Link>
);
