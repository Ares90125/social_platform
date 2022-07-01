import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AuthLayout } from '../../layouts/authLayout/AuthLayout';
import { TabsLayout } from '../../layouts/tabsLayout/TabsLayout';
import { Info } from './components/info/Info';
import { BrandsSearch } from './components/brandsSearch/BrandsSearch';
import { BrandSchema } from '../../../api/Brand/BrandSchema';
import { BrandItem } from './components/brandItem/BrandItem';
import { BrandList } from './components/brandList/BrandList';
import { BrandTab } from './components/brandTab/BrandTab';
import * as MS from './manageBrands.styled';
import { NoBrandsFound } from './components/noBrandsFound/NoBrandsFound';
import { getAllBrands } from '../../../graphs/brands';
import { LoadingLayout } from '../../layouts/loadingLayout/LoadingLayout';

type ManageBrandsScreenProps = {};

export const ManageBrandsScreen: React.FC<ManageBrandsScreenProps> = () => {
  const { data, isLoading } = useQuery('brands', getAllBrands);
  const [searchValue, setSearchValue] = useState('');
  const [brands, setBrands] = useState<BrandSchema[]>([]);
  const [filtredBrands, setFiltredBrands] = useState<BrandSchema[]>([]);

  const activeBrands = filtredBrands.filter(
    ({ status }) => status === 'Active',
  );
  const draftBrands = filtredBrands.filter(({ status }) => status === 'Draft');

  const handleBrandSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFiltredBrands(
      brands.filter(({ name }) =>
        name.toLowerCase().includes(e.target.value.trim().toLocaleLowerCase()),
      ),
    );
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (data) {
      const correctBrands = data.filter((c) => c);

      setBrands([...correctBrands]);
      setFiltredBrands([...correctBrands]);
    }
  }, [data]);

  return (
    <AuthLayout>
      <LoadingLayout isLoading={isLoading}>
        <>
          <TabsLayout
            topSection={
              <MS.ContentWrapper>
                <Info />
                <BrandsSearch
                  brands={filtredBrands}
                  updateBrands={handleBrandSearch}
                  searchValue={searchValue}
                />
              </MS.ContentWrapper>
            }
            tabs={[
              {
                value: 'Campaign Brands',
                tabContent: (
                  <BrandTab
                    label="Campaign Brands"
                    chipLabel={activeBrands.length}
                    key="Campaign Brands"
                  />
                ),
                tabPanelContent: (
                  <BrandList key="Campaign Brands">
                    {activeBrands.map((brand) => (
                      <BrandItem {...brand} key={brand.id} />
                    ))}
                  </BrandList>
                ),
              },
              {
                value: 'Draft Proposals',
                tabContent: (
                  <BrandTab
                    label="Draft Proposals"
                    chipLabel={draftBrands.length}
                    key="Draft Proposals"
                  />
                ),
                tabPanelContent: (
                  <BrandList key="Draft Proposals">
                    {draftBrands.map((brand) => (
                      <BrandItem {...brand} key={brand.id} />
                    ))}
                  </BrandList>
                ),
              },
            ]}
          />
          {!filtredBrands.length && <NoBrandsFound searchValue={searchValue} />}
        </>
      </LoadingLayout>
    </AuthLayout>
  );
};
