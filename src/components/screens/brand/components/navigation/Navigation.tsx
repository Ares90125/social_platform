import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowBack, ArrowDropDown } from '@mui/icons-material';
import {
  BrandsWrapper,
  NavigationWrapper,
  NavigationContainer,
  BrandInfo,
  OtherBrandsWrapper,
} from './navigation.styled';
import { BrandSchema } from '../../../../../api/Brand/BrandSchema';

type NavigationProps = Partial<{
  brands: BrandSchema[];
  activeBrand: BrandSchema;
}>;

export const Navigation: React.FC<NavigationProps> = ({
  brands,
  activeBrand,
}) => {
  const [isBrandsOpened, setIsBrandsOpened] = useState(false);

  const toggleOtherBrands = (): void => {
    setIsBrandsOpened(!isBrandsOpened);
  };

  const closeOtherBrands = (): void => {
    setIsBrandsOpened(false);
  };

  useEffect(() => closeOtherBrands, []);

  return (
    <NavigationWrapper>
      <NavigationContainer>
        {activeBrand && (
          <>
            <Link href="/manage-brands">
              <a>
                <ArrowBack />
              </a>
            </Link>
            <BrandsWrapper>
              <BrandInfo onClick={toggleOtherBrands}>
                <figure>
                  {activeBrand.iconUrl && (
                    <img src={activeBrand.iconUrl} alt={activeBrand.name} />
                  )}
                </figure>
                <p>{activeBrand.name}</p>
                <ArrowDropDown />
              </BrandInfo>
              {isBrandsOpened && brands && (
                <OtherBrandsWrapper>
                  {brands.map(({ name, id }) => (
                    <li key={id} onClick={closeOtherBrands}>
                      <Link href={`/brands/${id}`}>
                        <a>{name}</a>
                      </Link>
                    </li>
                  ))}
                </OtherBrandsWrapper>
              )}
            </BrandsWrapper>
          </>
        )}
      </NavigationContainer>
    </NavigationWrapper>
  );
};
