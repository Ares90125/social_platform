import React from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type TagProps = {
  label?: string;
  onClick?: () => void;
};

export const Tag: React.FC<TagProps> = ({ label, onClick }) => (
  <Button
    variant="outlined"
    sx={{ borderRadius: 4, mr: 2, fontWeight: 600, textTransform: 'initial' }}
    endIcon={<CloseIcon />}
    onClick={onClick}
  >
    {label}
  </Button>
);
