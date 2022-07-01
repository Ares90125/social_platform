import React, { useState } from 'react';
import { Modal, Paper, Box, Typography, Button } from '@mui/material';
import { useMutation } from 'react-query';
import { modalStyles, requireAssetModalStyles } from '../styles';
import {
  requireAssetReminder,
  RequireAssetReminderArgs,
} from '../../../../../../../graphs/requireAssetReminder';
import { ModalHeader } from '../../../../../../ui/ModalHeader';

type RequiereAssetModalProps = {
  campaignId: string | undefined;
  selectionModel: string[];
  isOpen: boolean;
  setIsRequireAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RequiereAssetModal: React.FC<RequiereAssetModalProps> = ({
  campaignId,
  selectionModel,
  isOpen,
  setIsRequireAssetModalOpen,
}) => {
  const [message, setMessage] = useState<string>('');
  const mutation = useMutation((data: RequireAssetReminderArgs) =>
    requireAssetReminder(data),
  );
  const handleCloseModal = (): void => {
    setIsRequireAssetModalOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };
  const handleSubmit = (): void => {
    selectionModel.forEach((groupId) => {
      mutation.mutate({
        campaignId: campaignId!,
        groupId,
        message,
      });
    });
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Paper sx={{ ...modalStyles.container, maxWidth: '520px' }}>
        <ModalHeader text="Require Asset" closeModal={handleCloseModal} />
        <Box sx={{ padding: '16px' }}>
          <Typography sx={{ mb: '16px' }}>
            Please enter a comment of asset requirement.
          </Typography>
          <textarea
            style={requireAssetModalStyles.textarea as React.CSSProperties}
            value={message}
            onChange={handleChange}
            placeholder="Enter your comment..."
          />
        </Box>
        <Box sx={{ ...modalStyles.bottomBox, flexDirection: 'row-reverse' }}>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={handleSubmit}
          >
            Require Asset
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
