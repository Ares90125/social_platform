import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type MetricProps = {
  label?: string;
  children?: ReactNode;
};

export const Metric: React.FC<MetricProps> = ({ label, children }) => (
  <Box sx={{ mr: 3 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 'light' }}>
      {label}
    </Typography>
    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
      {children}
    </Typography>
  </Box>
);
