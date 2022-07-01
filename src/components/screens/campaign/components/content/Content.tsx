import React from 'react';
import { useRouter } from 'next/router';
import { ContentWrapper } from './content.styled';
import { Breadcrumbs } from '../../../../ui/Breadcrumbs';
import { CampaignInputs } from '../detailsTab/campaign.types';

type ContentProps = {
  campaign?: CampaignInputs;
};

export const Content: React.FC<ContentProps> = ({ campaign }) => {
  const router = useRouter();

  return (
    <ContentWrapper>
      <Breadcrumbs campaign={campaign} />
      {typeof router.query?.name === 'string' && <h4>{router.query.name}</h4>}
      {campaign?.campaignName && <h4>{campaign?.campaignName}</h4>}
    </ContentWrapper>
  );
};
