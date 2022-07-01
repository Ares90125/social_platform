/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Switch } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import styles from '../../../../../../../assests/scss/campaign.module.scss';
import { IUpdatedResultSection } from '../KPIResult';
import { BootstrapDialog, BootstrapDialogTitle } from './BaseModal';

type ResultsModalProp = {
  handleClose: any;
  results?: IUpdatedResultSection;
  open: boolean;
};

export const ResultsModal: React.FC<ResultsModalProp> = ({
  handleClose,
  results,
  open,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const changeTypeKey = (e: any) => {
    console.log(e);
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
        Edit: Results
      </BootstrapDialogTitle>
      <Grid className={styles.line} />
      <Grid
        container
        className={styles.customized_dialog}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item sx={{ marginTop: '30px' }}>
          <span className={styles.span}>Overall Metrics</span>
          <Switch
            sx={{ marginLeft: '50px' }}
            {...label}
            defaultChecked
            size="small"
          />
        </Grid>
        <Grid
          item
          width="100%"
          sx={{ marginBottom: '8px', marginTop: '10px', marginLeft: '10px' }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ borderBottom: '1px solid #e2e2e2' }}
          >
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Metric Name</span>
            </Grid>
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Pre-Campaign</span>
            </Grid>
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Achieved</span>
            </Grid>
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Visibility To brand</span>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="Category Conversations"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numBeforeCatConversations}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numDuringCatConversations}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
            <Grid item>
              <Switch
                sx={{ marginLeft: '10px' }}
                {...label}
                defaultChecked
                size="small"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="Brand Mentions"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numBeforeBrandMentions}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numCommentUGCPost}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
            <Grid item>
              <Switch
                sx={{ marginLeft: '10px' }}
                {...label}
                defaultChecked
                size="small"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="Brand Share of Voice"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item className={styles.icon_input_container}>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.brandPercentageBeforeSov}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
              <i className={styles.percent_icon}>%</i>
            </Grid>
            <Grid item className={styles.icon_input_container}>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.brandPercentageDuringSov}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
              <i className={styles.percent_icon}>%</i>
            </Grid>
            <Grid item>
              <Switch
                sx={{ marginLeft: '10px' }}
                {...label}
                defaultChecked
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.results_header}>
          <span className={styles.span}>UGC Metrics</span>
          <Switch
            sx={{ marginLeft: '50px' }}
            {...label}
            defaultChecked
            size="small"
          />
        </Grid>

        <Grid
          item
          width="100%"
          sx={{ marginBottom: '8px', marginLeft: '10px' }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ borderBottom: '1px solid #e2e2e2' }}
          >
            <Grid item className={styles.results_header}>
              <span className={styles.span}>UGC Type</span>
            </Grid>
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Achieved</span>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="UGC Comments"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numUGCComments}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="UGC Net New Posts"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numUGCPosts}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ marginTop: '30px' }}>
          <span className={styles.span}>Results & Comments</span>
          <Switch
            sx={{ marginLeft: '50px' }}
            {...label}
            defaultChecked
            size="small"
          />
        </Grid>
        <Grid
          item
          width="100%"
          sx={{ marginBottom: '8px', marginTop: '10px', marginLeft: '10px' }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ borderBottom: '1px solid #e2e2e2' }}
          >
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Post Type</span>
            </Grid>
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Reactions</span>
            </Grid>
            <Grid item className={styles.results_header}>
              <span className={styles.span}>Comments</span>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="Admin Posts"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numReactionAdminPost}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numCommentAdminPost}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: '20px' }}
          >
            <Grid item>
              <input
                disabled
                value="UGC Posts"
                className={styles.sentiment_input}
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numReactionUGCPost}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
            </Grid>
            <Grid item>
              <input
                onChange={(e) => {
                  changeTypeKey(e);
                }}
                value={results?.content.numCommentUGCPost}
                className={styles.sentiment_input}
                placeholder="Input amount"
              />
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
