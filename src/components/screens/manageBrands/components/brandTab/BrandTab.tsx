import React from 'react';
import { Chips } from '../../../../chips/Chips';
import { BrandTabWrapper } from './brandTab.styled';

type BrandTabProps = {
  label: string;
  chipLabel?: string | number;
};

export const BrandTab: React.FC<BrandTabProps> = ({ label, chipLabel }) => (
  <BrandTabWrapper>
    <span>{label}</span>
    {typeof chipLabel !== 'undefined' && (
      <Chips offset="left">{chipLabel}</Chips>
    )}
  </BrandTabWrapper>
);
