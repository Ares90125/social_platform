import React from 'react';
import { CampaignInputs } from '../../../campaign/components/detailsTab/campaign.types';
import { CampaignItem } from '../campaignItem/CampaignItem';
import { NoResults } from '../noResults/NoResults';
import {
  CampaignGroupWrapper,
  CampaignListWrapper,
  GroupDate,
} from './campaignList.styled';

type CampaignListProps = {
  groupedCampaigns?: _.Dictionary<CampaignInputs[]>;
};

export const CampaignList: React.FC<CampaignListProps> = ({
  groupedCampaigns,
}) =>
  groupedCampaigns && Object.keys(groupedCampaigns).length > 0 ? (
    <div>
      {Object.entries(groupedCampaigns).map(([date, campaigns]) => (
        <CampaignGroupWrapper key={date}>
          <GroupDate>
            {date === 'Invalid date' ? 'NO START DATE' : date}
          </GroupDate>
          <CampaignListWrapper>
            {campaigns.map((campaign) => (
              <CampaignItem key={campaign.campaignId} {...campaign} />
            ))}
          </CampaignListWrapper>
        </CampaignGroupWrapper>
      ))}
    </div>
  ) : (
    <NoResults />
  );
