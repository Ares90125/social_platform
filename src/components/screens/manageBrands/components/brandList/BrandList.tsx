import React from 'react';
import { BrandListWrapper } from './brandList.styled';

export const BrandList: React.FC = ({ children }) => (
  <BrandListWrapper>{children}</BrandListWrapper>
);
