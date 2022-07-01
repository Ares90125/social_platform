import React, { useState } from 'react';
import _ from 'lodash';
import { Box, Modal, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { ButtonOutlined } from '../../../form';
import { ButtonPrimary } from '../../../form/button/Button';
import { deleteCMCampaignGroups } from '../../../../graphs/deleteCMCampaignGroups';
import { NormalizedCommunity } from '../../../../graphs/listCampaignGroupsAndTasksDetails';
import { useToast } from '../../../../context/toast';
import { ModalHeader } from '../../../ui/ModalHeader';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  margin: '0 auto',
  background: '#fff',
  maxWidth: '500px',
  borderRadius: '8px',
};

type CommunitiesModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  groupIds: string[];
  campaignId?: string;
  brandId?: string;
  handleSelection: () => void;
  normalizedCommunities: NormalizedCommunity[];
};

export const RemoveCommunitiesModal: React.FC<CommunitiesModalProps> = ({
  isOpen,
  handleClose,
  campaignId,
  groupIds,
  brandId,
  handleSelection,
  normalizedCommunities,
}) => {
  const queryClient = useQueryClient();
  const { setSuccessToast, setErrorToast } = useToast();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const deleteMutation = useMutation(
    (data: { campaignId: string; groupIds: string[] }) =>
      deleteCMCampaignGroups(data.campaignId, data.groupIds),
    {
      onMutate: () => {
        setIsButtonDisabled(true);
      },
      onSuccess: () => {
        setIsButtonDisabled(false);
        handleClose();
        setSuccessToast();
        if (brandId && campaignId) {
          queryClient.invalidateQueries(`brands-${brandId}-${campaignId}`);
          handleSelection();
        }
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const selectedMembersCount = normalizedCommunities
    ?.filter(
      ({ groupId }) =>
        typeof groupId === 'string' && groupIds.includes(groupId),
    )
    .reduce((prev, curr) => prev + (curr?.memberCount || 0), 0);

  const handleDelete = (): void => {
    if (campaignId && groupIds.length > 0) {
      const groupIdChunks = _.chunk(groupIds, 25);

      Promise.all(
        groupIdChunks.map((chunk) =>
          deleteMutation.mutateAsync({ campaignId, groupIds: chunk }),
        ),
      );
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <ModalHeader text="Remove from Campaign" closeModal={handleClose} />
        <Box sx={{ p: '16px' }}>
          <Typography variant="body1" component="p">
            Are you sure you want to remove {groupIds.length} communities with{' '}
            {selectedMembersCount} members from the campaign?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: '10px',
            }}
          >
            <ButtonOutlined
              sx={{ width: 'calc(50% - 10px)' }}
              onClick={handleClose}
            >
              Cancel
            </ButtonOutlined>
            <ButtonPrimary
              color="error"
              disabled={isButtonDisabled}
              sx={{ width: 'calc(50% - 10px)' }}
              onClick={handleDelete}
            >
              Remove from Campaign
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
