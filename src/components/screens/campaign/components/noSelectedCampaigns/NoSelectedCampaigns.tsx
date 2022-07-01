import React from 'react';
import Image from 'next/image';
import { Button } from '../../../../form';
import { NoSelectedCampaignsWrapper } from './noSelectedCampaigns.styled';

type NoSelectedCampaignsProps = {
  openCommunityModal: () => void;
};

export const NoSelectedCampaigns: React.FC<NoSelectedCampaignsProps> = ({
  openCommunityModal,
}) => (
  <NoSelectedCampaignsWrapper>
    <Image
      src="/icons/glass-icon.svg"
      alt="Glass icon"
      width={72}
      height={72}
    />
    <h3>No communities selected for the campaign</h3>
    <p>Pick the required information above to see a list of communities</p>
    <Button type="button" onClick={openCommunityModal}>
      Add communities
    </Button>
  </NoSelectedCampaignsWrapper>
);
