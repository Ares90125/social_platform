import React, { useState } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { Close, Add } from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Typography, Dialog, IconButton } from '@mui/material';
import { ModalHeader } from '../../../../../../ui/ModalHeader';
import { Button, ButtonOutlined, Input } from '../../../../../../form';
import { updateCampaignProposals } from '../../../../../../../graphs/updateCMCampaignDetails';
import { useToast } from '../../../../../../../context/toast';
import { CampaignInputs } from '../../../detailsTab/campaign.types';
import { CampaignStatusEnum } from '../../../../../../../utils/enums/campaignStatus';
import { markCampaignStatus } from '../../../../../../../graphs/markCampaignStatus';

const proposalLink = `${process.env.URL_CLIENT}/brand/manage-campaigns`;

type SendProposalToBrandModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  campaign: CampaignInputs | undefined;
};

export const SendProposalToBrandModal: React.FC<
  SendProposalToBrandModalProps
> = ({ campaign, isOpen, closeModal }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setSuccessToast, setErrorToast } = useToast();
  const [emails, setEmails] = useState<
    { id: number; value: string; error: boolean }[]
  >([]);

  const mutationMarkCampaignStatus = useMutation(markCampaignStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(`brand-${router.query.id}`);
      setSuccessToast(
        <>
          <span>Campaign creation Successful</span>
          <br />
          <span>Proposal Sent</span>
        </>,
      );
    },
    onError: () => {
      setErrorToast(
        <>
          <span>Campaign creation unsuccessful</span>
          <br />
          <span>
            We are unable to create campaign at this moment. Please try again
            later.
          </span>
        </>,
      );
    },
  });

  const mutationUpdateCampaignProposals = useMutation(updateCampaignProposals, {
    onSuccess: () => {
      if (campaign?.brandId && campaign?.campaignId) {
        mutationMarkCampaignStatus.mutate({
          brandId: campaign.brandId,
          campaignId: campaign.campaignId,
          status: CampaignStatusEnum.PendingApproval,
        });
      }
    },
    onError: () => {
      setErrorToast(
        <>
          <span>Campaign creation unsuccessful</span>
          <br />
          <span>
            We are unable to create campaign at this moment. Please try again
            later.
          </span>
        </>,
      );
    },
  });

  const copyLink = (): void => {
    navigator?.clipboard?.writeText(proposalLink);
  };

  const addEmail = (): void => {
    const lastId = emails?.[emails.length - 1]?.id || 0;
    setEmails([...emails, { id: lastId + 1, value: '', error: true }]);
  };

  const removeEmail = (idToRemove: number): void => {
    setEmails(emails.filter(({ id }) => id !== idToRemove));
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    const schema = yup.string().email();
    const updatedEmails = [...emails];
    updatedEmails[index] = {
      ...updatedEmails[index],
      value: e.target.value,
      error: schema.isValidSync(e.target.value),
    };
    setEmails(updatedEmails);
  };

  const handleClose = (): void => {
    setEmails([]);
    closeModal();
  };

  const handleSubmit = (): void => {
    if (
      !campaign?.brandId ||
      !campaign?.campaignId ||
      !campaign?.campaignName
    ) {
      setErrorToast(
        <>
          <span>Campaign creation unsuccessful</span>
          <br />
          <span>
            We are unable to create campaign at this moment. Please try again
            later.
          </span>
        </>,
      );

      return;
    }

    mutationUpdateCampaignProposals.mutate({
      brandId: campaign.brandId,
      campaignId: campaign.campaignId,
      campaignName: campaign.campaignName,
      proposalEmails: emails.map(({ value }) => value),
      status: CampaignStatusEnum.Draft,
    });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box>
        <ModalHeader text="Send Proposal to Brand" closeModal={handleClose} />
        <Box sx={{ p: '8px 16px', borderBottom: '1px solid #dee2e6' }}>
          <Typography
            component="h5"
            sx={{ padding: '16px', fontSize: '14px', color: '#33334f' }}
          >
            Send the proposal to brand to get it accepted by the brand
          </Typography>
          <Input
            value={proposalLink}
            htmlInputProps={{
              readOnly: true,
            }}
            iconPosition="end"
            icon={<Button onClick={copyLink}>Copy</Button>}
            sx={{ mb: '20px' }}
          />
          <Box sx={{ mb: '10px' }}>
            <Typography
              component="h5"
              sx={{ fontSize: '12px', fontWeight: '500', color: '#33334f' }}
            >
              Enter email addresses *
            </Typography>
            <Typography
              component="p"
              sx={{ fontSize: '12px', color: '#707084' }}
            >
              You can enter multiple
            </Typography>
          </Box>
          <Box>
            {emails.map((email, index) => (
              <Box
                key={email.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-center',
                  mb: '10px',
                }}
              >
                <Input
                  value={email.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    handleEmailChange(e, index);
                  }}
                  size="small"
                  error={!email.error}
                />
                <IconButton
                  onClick={(): void => removeEmail(email.id)}
                  size="small"
                >
                  <Close />
                </IconButton>
              </Box>
            ))}
          </Box>
          <ButtonOutlined sx={{ width: '100%', mb: '15px' }} onClick={addEmail}>
            <Add /> Add {emails.length > 0 && ' another '} email
          </ButtonOutlined>
          <Button
            sx={{ width: '100%', mb: '5px' }}
            onClick={handleSubmit}
            disabled={
              emails.length === 0 ||
              emails.some(
                ({ error, value }) => !error || value.trim().length === 0,
              )
            }
          >
            Send Proposal
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
