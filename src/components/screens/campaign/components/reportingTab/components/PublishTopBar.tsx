import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';
import styles from '../../../../../../assests/scss/campaign.module.scss';

const PublishTopBar: React.FC = () => (
  <div className={styles.publishbar_wrap}>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <Grid className={clsx(styles.pulishbar_data, styles.pulishbar_public)}>
          Refresh Data
        </Grid>
        <Grid className={styles.pulishbar_driver}>|</Grid>
        <Grid
          className={clsx(styles.pulishbar_report, styles.pulishbar_public)}
        >
          The report is currently set to Advance Report Template.
        </Grid>
        <Grid
          className={clsx(styles.pulishbar_template, styles.pulishbar_public)}
        >
          Update Template
        </Grid>
        <Grid
          className={clsx(styles.pulishbar_template, styles.pulishbar_public)}
        >
          Preview Report
        </Grid>
        <Grid className={clsx(styles.pulishbar_more, styles.pulishbar_public)}>
          More
        </Grid>
        <Grid sx={{ float: 'left' }}>
          <img src="/images/menuToggle.jpg" />
        </Grid>
      </Grid>
    </Grid>
    {/* <div className="container">
      <div className={styles.publishbar_inner}>
        <div className={styles.bar_message}>
          <Info fontSize="small" />
          <span>
            You have made changes to this report.{' '}
            <strong>Publish the report to confirm these changes</strong> and
            update this report on brand dashboard.
          </span>
        </div>
        <div>
          <button className={styles.btn_publish}>
            <Check fontSize="small" />
            <span>Publish now</span>
          </button>
        </div>
      </div>
    </div> */}
  </div>
);
export default PublishTopBar;
