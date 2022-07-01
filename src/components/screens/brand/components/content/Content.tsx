import React from 'react';
import { useRouter } from 'next/router';
import { CreateCampaignButton, ContentWrapper } from './content.styled';

export const Content: React.FC = () => {
  const router = useRouter();

  const moveTo = (): void => {
    router.push(`${router.asPath}/create-campaign`);
  };

  return (
    <ContentWrapper>
      <h1>Campaigns</h1>
      <CreateCampaignButton onClick={moveTo}>
        + Create new campaign
      </CreateCampaignButton>
    </ContentWrapper>
  );
};
