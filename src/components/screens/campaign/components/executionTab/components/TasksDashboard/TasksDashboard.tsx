import React, { useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Tooltip } from '../../../../../../tooltip/Tooltip';
import { CampaignInputs } from '../../../detailsTab/campaign.types';
import { styles, TooltipIcon } from './TasksDashBoard.styles';
import { SendProposalToBrandModal } from '../SendProposalToBrandModal/SendProposalToBrandModal';

type TasksDashboardProps = {
  campaign: CampaignInputs | undefined;
  isCampaignreadyForSendProposal: boolean;
};

export const TasksDashboard: React.FC<TasksDashboardProps> = ({
  campaign,
  isCampaignreadyForSendProposal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNotReady = (): boolean =>
    !!(
      (!campaign?.startDateAtUTC ||
        !campaign?.campaignId ||
        // is this variable below the current communities from execution tab?
        // selectedCommunitiesFromApi?.length === 0 ||
        !isCampaignreadyForSendProposal) &&
      campaign?.status === 'Draft'
    );

  const isReady = (): boolean =>
    !!(
      campaign &&
      campaign.campaignId &&
      isCampaignreadyForSendProposal &&
      campaign?.status === 'Draft'
    );

  const isSent = (): boolean =>
    !!(
      campaign?.status &&
      campaign?.status !== 'Draft' &&
      campaign?.status === 'PendingApproval' &&
      isCampaignreadyForSendProposal
    );

  const isApproved = (): boolean =>
    !!(
      campaign &&
      campaign?.status &&
      campaign?.status !== 'PendingApproval' &&
      campaign?.status !== 'Draft' &&
      isCampaignreadyForSendProposal
    );

  const showTooltipTitle = (): string => {
    if (isNotReady()) {
      return campaign?.startDateAtUTC
        ? 'One or more selected groups do not have a task created'
        : 'Campaign Details not saved';
    }
    return '';
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        <Tooltip title={showTooltipTitle()}>
          <Box sx={styles.row}>
            <TooltipIcon
              ready={isReady()}
              approved={isApproved()}
              brandProposalSent={isSent()}
            />

            {isNotReady() && (
              <Typography component="span" sx={styles.text}>
                Not Ready to send for brand proposal
              </Typography>
            )}

            {isSent() && (
              <Typography component="span" sx={styles.text}>
                Brand Proposal Sent
              </Typography>
            )}

            {isReady() && (
              <>
                <Typography component="span" sx={{ ...styles.text }}>
                  Ready to send Brand Proposal
                </Typography>
                <Link sx={styles.button} onClick={openModal}>
                  Send
                </Link>
              </>
            )}
            {isApproved() && (
              <Typography component="span" sx={styles.text}>
                Brand Proposal Approved
              </Typography>
            )}
          </Box>
        </Tooltip>
      </Box>
      <SendProposalToBrandModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        campaign={campaign}
      />
    </>
  );
};
