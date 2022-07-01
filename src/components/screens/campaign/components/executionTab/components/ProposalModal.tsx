import React from 'react';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, ButtonOutlined } from '../../../../../form';
import { ButtonPrimary } from '../../../../../form/button/Button';
import { ModalHeader } from '../../../../../ui/ModalHeader';

type ProposalModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  sendToAllSelected: () => void;
  sendToWithoutProposals: () => void;
};

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  closeModal,
  sendToAllSelected,
  sendToWithoutProposals,
}) => (
  <Dialog open={isOpen} onClose={closeModal} maxWidth="xs" fullWidth>
    <Box>
      <ModalHeader text="Send Proposal Warning" closeModal={closeModal} />
      <Box sx={{ p: '16px 24px', borderBottom: '1px solid #dee2e6' }}>
        <Typography
          component="h5"
          sx={{ padding: '16px', fontSize: '14px', color: '#33334f' }}
        >
          Sure you want to send proposals to Communities that already received
          proposals?
        </Typography>
        <Button
          sx={{ width: '100%', mb: '5px' }}
          onClick={(): void => {
            sendToWithoutProposals();
            closeModal();
          }}
        >
          Send to communities without proposals yet
        </Button>
        <ButtonPrimary
          sx={{
            width: '100%',
            mb: '5px',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          }}
          color="error"
          onClick={(): void => {
            sendToAllSelected();
            closeModal();
          }}
        >
          Send to all selected communities
        </ButtonPrimary>
        <ButtonOutlined sx={{ width: '100%' }} onClick={closeModal}>
          Cancel
        </ButtonOutlined>
      </Box>
    </Box>
  </Dialog>
);
