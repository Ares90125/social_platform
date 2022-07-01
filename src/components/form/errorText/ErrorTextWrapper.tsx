import React from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';
import { Colors } from '../../../utils/enums/colors';

const styles = {
  message: {
    position: 'absolute',
    left: 0,
    bottom: '-20px',
    padding: 0,
    margin: 0,
    color: Colors.ERROR_TEXT,
    fontSize: '13px',
    lineHeight: '15px',
  },
};

type ErrorTextWrapperProps = {
  errorText?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

const ErrorTextWrapper: React.FC<ErrorTextWrapperProps> = ({
  children,
  errorText,
  sx,
}) => (
  <Box
    sx={
      sx
        ? {
            width: '100%',
            position: 'relative',
            ...sx,
          }
        : {
            width: '100%',
            position: 'relative',
          }
    }
  >
    {children}
    {errorText && <Typography sx={styles.message}>{errorText}</Typography>}
  </Box>
);

export default ErrorTextWrapper;
