/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Switch } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import styles from '../../../../../../../assests/scss/campaign.module.scss';
import { BootstrapDialog, BootstrapDialogTitle } from './BaseModal';

export const SOVModal = ({ handleClose, brands, open }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [values, setValues] = useState(brands);

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
        Edit: Brand Share of Voice
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
            <Grid item className={styles.brand_name}>
              <span className={styles.span}>Brand name</span>
            </Grid>
            <Grid item className={styles.headers}>
              <span className={styles.span}>Pre-Campaign</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.headers}>
              <span className={styles.span}>During Campaign</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.headers}>
              <span className={styles.span}>Post Campaign</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.headers}>
              <span className={styles.span}>Non Hashtag</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.color}>
              <span className={styles.span}>Color</span>
            </Grid>
          </Grid>
        </Grid>
        {values.map((item, index) => (
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item className={styles.sov_input_container_head}>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  value={item.name}
                  disabled
                  className={styles.sov_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item className={styles.sov_input_container}>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  value={item.data[0]}
                  className={styles.sov_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item className={styles.sov_input_container}>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  value={item.data[1]}
                  className={styles.sov_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item className={styles.sov_input_container}>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  value={item.data[2]}
                  className={styles.sov_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item className={styles.sov_input_container}>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  value={item.data[3]}
                  className={styles.sov_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <span
                  className={styles.color_rect}
                  style={{ color: item.color }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <button className={styles.button} onClick={handleClose}>
          Save
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};
