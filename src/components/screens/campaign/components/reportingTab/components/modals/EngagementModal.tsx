/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Switch } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import styles from '../../../../../../../assests/scss/campaign.module.scss';
import { BootstrapDialog, BootstrapDialogTitle } from './BaseModal';

export const EngagementModal = ({ handleClose, insights, title, open }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [customInsights, setCustomInsights] = useState<any>(insights || []);

  const removeBrand = (name) => {
    const newBrands = customInsights.filter((brand) => brand.name !== name);
    setCustomInsights(newBrands);
  };

  const addAnother = () => {
    setCustomInsights([
      ...customInsights,
      { name: '', share: '', keywords: '', color: '', visible: true },
    ]);
  };

  const changeTypeKey = (e: any, index: number) => {
    console.log(e, index);
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit: {title}
      </BootstrapDialogTitle>
      <Grid className={styles.line} />
      <Grid
        container
        className={styles.customized_dialog}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item width="100%" sx={{ marginBottom: '8px' }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item className={styles.insight_headers}>
              <span className={styles.span}>Bucket</span>
            </Grid>
            <Grid item className={styles.insight_headers}>
              <span className={styles.span}>Share</span>
            </Grid>
            <Grid item className={styles.insight_headers}>
              <span className={styles.span}>Keywords to track</span>
            </Grid>
            <Grid item className={styles.color}>
              <span className={styles.span}>Color</span>
            </Grid>
            <Grid item className={styles.color}>
              <span className={styles.span}>Visible to Brand</span>
            </Grid>
          </Grid>
        </Grid>
        {customInsights.map((item, index) => (
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid key={index} item sx={{ marginTop: '11.67px' }}>
                <img
                  src="/images/ban.jpg"
                  onClick={() => {
                    removeBrand(item.name);
                  }}
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  className={styles.bucket_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  className={styles.bucket_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  className={styles.bucket_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  className={styles.bucket_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <Switch
                  sx={{ marginLeft: '50px' }}
                  {...label}
                  defaultChecked
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item className={styles.add_another}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <img src="/images/add.jpg" />
            </Grid>
            <Grid item className={styles.another} onClick={addAnother}>
              Add another bucket
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogActions>
        <button className={styles.button} onClick={handleClose}>
          Save
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};
