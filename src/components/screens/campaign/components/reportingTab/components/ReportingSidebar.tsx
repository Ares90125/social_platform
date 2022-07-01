/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CMCReportv3S3Data } from '../../detailsTab/campaign.types';

type ReportSidebarProp = {
  handleClick: Function,
  campaignReportS3Data: CMCReportv3S3Data | null
};

const ReportingSidebar: React.FC<ReportSidebarProp> = ({
  handleClick,
  campaignReportS3Data,
}) => (
  <div className={styles.left_sidebar}>

    <Grid container direction="column">
      <Grid item className={styles.left_title}>
        OVERVIEW
      </Grid>
      <Grid item className={styles.left_title_selected} onClick={() => handleClick('campaignDetail')}>
        Campaign Details
      </Grid>
      <Grid item className={styles.left_title_divider} />
      <Grid item className={styles.left_title}>
        CAMPAIGN SUMMARY
      </Grid>
      <Grid item>
        <Grid container direction="row" onClick={() => handleClick('phaseIdea')}>
          <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Phase Idea</Grid>
          { (campaignReportS3Data && !campaignReportS3Data.phaseIdeaDetails.visibleToBrand) &&
            <Grid item sx={{ marginTop: '18px' }}>
              <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
            </Grid>}
        </Grid>
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('keyFindings')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Key Findings</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.keyFindings.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('results')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Results</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.results.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid item>
        <Grid container direction="row" onClick={() => handleClick('brandSOV')}>
          <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Brand Share of Voice</Grid>
          { (campaignReportS3Data && !campaignReportS3Data.brandShareOfVoice.visibleToBrand) &&
            <Grid item sx={{ marginTop: '18px' }}>
              <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
            </Grid>}
        </Grid>
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('brandSentiment')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Brand Sentiment</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.brandSentiment.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid item className={clsx(styles.divider_item, styles.left_title_divider)} />
      <Grid item className={styles.left_title}>
        ENGAGEMENT INSIGHTS
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('intent')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Intent</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.engagementInsight.intentVisibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('emotions')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Emotions</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.engagementInsight.emotionsVisibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('benefits')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Benefits</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.engagementInsight.benefitsVisibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('wordCloud')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Word Cloud</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.wordCloud.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('customConversation')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Custom Conversations</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.phaseIdeaDetails.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid item className={clsx(styles.divider_item, styles.left_title_divider)} />
      <Grid item className={styles.left_title}>
        COMMUNITY PARTICIPATION
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('participation')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Group-wise Engagement</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.phaseIdeaDetails.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
      <Grid item className={clsx(styles.divider_item, styles.left_title_divider)} />
      <Grid item className={styles.left_title}>
        SCREENSHOTS
      </Grid>
      <Grid container direction="row" onClick={() => handleClick('topPosts')}>
        <Grid item className={clsx(styles.left_title_hidden, styles.left_title_public)}>Top Performing Posts</Grid>
        { (campaignReportS3Data && !campaignReportS3Data.topPerformingPosts.visibleToBrand) &&
          <Grid item sx={{ marginTop: '18px' }}>
            <img className={styles.left_title_icon} src="/images/eyeOff.jpg" />
          </Grid>}
      </Grid>
    </Grid>
  </div>
);

export default ReportingSidebar;
