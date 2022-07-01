import React from 'react';
import Image from 'next/image';
import { NoResultsWrapper } from './noResults.styled';

export const NoResults: React.FC = () => (
  <NoResultsWrapper className="no-results-wrapper">
    <Image
      alt="No campaigns"
      src="/icons/empty_state_icon.svg"
      width={176}
      height={176}
    />
    <h5>No Campaigns found</h5>
  </NoResultsWrapper>
);
