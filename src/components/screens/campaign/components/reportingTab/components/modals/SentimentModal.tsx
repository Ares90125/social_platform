/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Switch } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import styles from '../../../../../../../assests/scss/campaign.module.scss';
import { BootstrapDialog, BootstrapDialogTitle } from './BaseModal';

export const SentimentModal = ({ handleClose, sentiments, open }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
        Edit: Brand Sentiment
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
            <Grid item className={styles.sentiment_header}>
              <span className={styles.span}>Timeline Title</span>
            </Grid>
            <Grid item className={styles.sentiment_header}>
              <span className={styles.span}>Positive</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.sentiment_header}>
              <span className={styles.span}>Neutral</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.sentiment_header}>
              <span className={styles.span}>Negative</span>
              <Switch {...label} />
            </Grid>
            <Grid item className={styles.sentiment_visible}>
              <span className={styles.span}>Visibility to Brand</span>
            </Grid>
          </Grid>
        </Grid>
        {sentiments.map((item, index) => (
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ marginTop: '20px' }}
            >
              <Grid key={index} item>
                <input
                  key={index}
                  disabled
                  value={item.title}
                  className={styles.sentiment_input}
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  key={index}
                  value={item.Positive}
                  className={styles.sentiment_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  value={item.Neutral}
                  key={index}
                  className={styles.sentiment_input}
                  placeholder="Type a keyword"
                />
              </Grid>
              <Grid item>
                <input
                  onChange={(e) => {
                    changeTypeKey(e, index);
                  }}
                  value={item.Negative}
                  key={index}
                  className={styles.sentiment_input}
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
      </Grid>
      <DialogActions>
        <button className={styles.button} onClick={handleClose}>
          Save
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};
