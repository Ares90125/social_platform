import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Keyword } from './Keyword';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '32px 48px 24px 24px',
    backgroundColor: '#f4f6f8',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

const BootstrapDialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

type KeywordsModalProps = {
  open: boolean;
  handleClose: () => void;
  saveKeywords: (keywords: { id: number; value: string }[]) => void;
  values?: string[];
};

export const KeywordsModal: React.FC<KeywordsModalProps> = ({
  open,
  handleClose,
  saveKeywords,
  values,
}) => {
  const [ks, setKs] = useState<{ id: number; value: string }[]>(
    values ? Array.from(values, (value, id) => ({ id, value })) : [],
  );

  const addKeyword = (): void => {
    setKs([...ks, { id: ks[ks.length - 1].id + 1, value: '' }]);
  };

  const removeKeyword = (id: number): void => {
    const newKeywords = ks.filter((keyword) => keyword.id !== id);
    setKs(newKeywords);
  };

  const saveK = (): void => {
    const removeEmpty = ks.filter((k) => k.value.length);

    setKs(removeEmpty);
    saveKeywords(removeEmpty);
    handleClose();
  };

  useEffect(() => {
    if (!values?.length) {
      setKs([{ id: 1, value: '' }]);
    }
  }, []);

  return (
    <BootstrapDialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Keywords
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ ml: 6, mb: 2, borderBottom: '1px solid #eee' }}>
          <Grid container sx={{ pb: 1 }} spacing={3}>
            <Grid item xs={4}>
              <Typography component="label" variant="subtitle2">
                Keyword
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 3 }}>
          {ks.map((iKeyword, index) => (
            <Keyword
              key={iKeyword.id}
              id={iKeyword.id}
              keyword={iKeyword.value}
              removeKeyword={removeKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const k = [...ks];
                k[index] = {
                  ...k[index],
                  value: e.target.value,
                };

                setKs(k);
              }}
            />
          ))}
        </Box>
        <Box sx={{ ml: 6 }}>
          <Button startIcon={<AddCircleOutlineIcon />} onClick={addKeyword}>
            Add another Keyword
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button size="medium" onClick={saveK}>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
