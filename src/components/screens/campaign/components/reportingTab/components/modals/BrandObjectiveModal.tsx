/* eslint-disable @typescript-eslint/explicit-function-return-type */
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import { useState } from 'react';
import styles from '../../../../../../../assests/scss/campaign.module.scss';
import { BootstrapDialog, BootstrapDialogTitle } from './BaseModal';
import { RichTextEditor } from '../common/RichTextEditor';

export const BrandObjectiveModal = ({
  handleClose,
  content,
  handleUpdate,
  open = true,
}) => {
  const [editorContent, setEditorContent] = useState(content);
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      >
        Edit: Brand Objective
      </BootstrapDialogTitle>
      <Grid className={styles.line} />
      <Grid
        container
        className={styles.customized_dialog}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <RichTextEditor
          value={content}
          onChange={(value) => setEditorContent(value)}
        />
      </Grid>
      <DialogActions>
        <button className={styles.button} onClick={() => handleUpdate(editorContent)}>
          Save
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};
