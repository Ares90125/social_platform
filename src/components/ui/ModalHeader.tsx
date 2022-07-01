import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Colors } from '../../utils/enums/colors';

type ModalHeaderProps = {
  text: string;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  closeModal: () => void;
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${Colors.BORDERS_GREY}`,
    p: '16px',
  },
  title: {
    fontSize: '16px',
    color: Colors.PRIMARY_1,
    fontWeight: 500,
  },
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  text,
  sx,
  children,
  closeModal,
}) => (
  <Box sx={sx ? { ...styles.wrapper, ...sx } : styles.wrapper}>
    {children || (
      <Typography component="h5" sx={styles.title}>
        {text}
      </Typography>
    )}
    <IconButton>
      <Close onClick={closeModal} sx={{ fontSize: '20px' }} />
    </IconButton>
  </Box>
);
