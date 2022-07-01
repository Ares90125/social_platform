import React from 'react';
import { Close } from '@mui/icons-material';
import { Box, Dialog, IconButton, Typography } from '@mui/material';

type ErrorPopupProps = {
  isOpen: boolean;
  closeModal: () => void;
  heading: string;
  content: string;
};

export const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isOpen,
  closeModal,
  heading,
  content,
}) => (
  <Dialog open={isOpen} onClose={closeModal} maxWidth="sm" fullWidth>
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #dee2e6',
          p: '16px',
        }}
      >
        <Typography
          component="h5"
          sx={{ fontSize: '20px', color: '#33334f', fontWeight: 500 }}
        >
          {heading}
        </Typography>
        <IconButton>
          <Close fontSize="medium" onClick={closeModal} />
        </IconButton>
      </Box>

      <Box sx={{ p: '16px 24px', borderBottom: '1px solid #dee2e6' }}>
        <Typography
          component="h5"
          sx={{ padding: '16px', fontSize: '14px', color: '#33334f' }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  </Dialog>
);
