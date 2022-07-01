import React from 'react';
import { Box, IconButton, Grid, TextField } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export type KeywordProps = {
  id: number;
  keyword?: string;
  removeKeyword?: (id: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Keyword: React.FC<KeywordProps> = ({
  id,
  keyword,
  removeKeyword,
  onChange,
}) => {
  const removeRow = (krywordId: number): void => {
    if (removeKeyword) {
      removeKeyword(krywordId);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <IconButton sx={{ mr: 1 }} onClick={(): void => removeRow(id)}>
        <RemoveCircleOutlineIcon color="warning" />
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Keyword 1_Transformation1a|Transformation1b"
            id="keyword"
            size="small"
            value={keyword}
            onChange={onChange}
            sx={{ background: '#fff' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
