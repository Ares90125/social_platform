/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';
import moment from 'moment';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { CMCReportMetricsV2 } from '../../../../../../graphs/getCMCReportMetricsV2';
import { BrandObjectiveModal } from './modals/BrandObjectiveModal';
import { formatNumber } from '../../../../../../utils/helpers/formatNumber';

type OverviewProps = {
  campaign?: CampaignInputs;
  campaignS3Info?: CMCReportMetricsV2;
  handleUpdateContent: Function;
  handleUpdatePreviewImage;
};

const CampaignOverview: React.FC<OverviewProps> = ({
  campaign,
  campaignS3Info,
  handleUpdateContent,
  handleUpdatePreviewImage,
}) => {
  const [showEditBrand, setShowEditBrand] = React.useState(false);
  const [brandObjective, setBrandObjective] = React.useState(
    campaign?.brandObjective,
  );
  const [img, setImg] = React.useState<string>(
    campaign?.s3CoverImageUrl
      ? campaign?.s3CoverImageUrl!
      : '/images/background.jpg',
  );

  const onClickEdit = () => {
    setShowEditBrand(true);
  };

  const fileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      handleUpdatePreviewImage(e.target.files[0]);
      new Promise<void>((resolve) => {
        reader.onload = function (result) {
          if (result.target?.result != null) {
            setImg(result.target.result as string);
          }
        };
        resolve();
      }).then(() => {
        console.log(img);
      });
    }
  };

  const formatDate = (day) => {
    if (day) {
      return moment(day).format('MMM DD, YYYY');
    }
    return '';
  };

  const handleUpdate = (content) => {
    setBrandObjective(content);
    setShowEditBrand(false);
    handleUpdateContent(content);
  };

  return (
    <>
      <Grid className={styles.campaign_bg} id="campaignDetail">
        <input
          type="file"
          id="file"
          onChange={fileUpload}
          accept=".gif,.jpg,.jpeg,.png"
          className="upload-file"
          style={{ display: 'none' }}
        />
        <img className={styles.bg} src={img} />
        <label htmlFor="file">
          <img className={styles.campaign_upload} src="/images/upload.jpg" />
          <span className={clsx(styles.campaign_span, styles.campaign_public)}>
            Click here to Update Campaign Image
          </span>
        </label>
        <Grid
          className={clsx(styles.campaign_title, styles.campaign_public)}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item>Overview</Grid>
          <Grid item className={styles.campaign_snapshot}>
            A snapshot of the health of the Campaign
          </Grid>
        </Grid>
        <Grid
          className={styles.campaign_grid}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item className={styles.dove}>
            <img
              style={{ margin: '9.43px 0px 9.43px 6.29px' }}
              src="/images/dove.jpg"
            />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item className={styles.report}>
                    {campaign?.campaignName} Report
                  </Grid>
                  <Grid item className={styles.phase}>
                    {campaign?.currentPhase &&
                      `(Phase ${campaign?.currentPhase} of ${campaign?.totalPhase})`}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={styles.date}>
                {formatDate(campaign?.startDateAtUTC)} -{' '}
                {formatDate(campaign?.endDateAtUTC)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={styles.community}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item className={styles.community_title}>
            Community Participation
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item className={styles.community_card}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item className={styles.total}>
                    TOTAL COMMUNITIES
                  </Grid>
                  <Grid item className={styles.num}>
                    {formatNumber(campaignS3Info?.numGroups)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={styles.community_card}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item className={styles.total}>
                    TOTAL AUDIENCE
                  </Grid>
                  <Grid item className={styles.num}>
                    {formatNumber(campaignS3Info?.numAudience)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ marginTop: '48px' }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item className={styles.community_title}>
                Brand Objective
              </Grid>
              <Grid item className={styles.edit} onClick={onClickEdit}>
                Edit
              </Grid>
              <Grid item onClick={onClickEdit}>
                <img className={styles.pen} src="/images/pen.jpg" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.span}>
            {brandObjective && (
              <div dangerouslySetInnerHTML={{ __html: brandObjective }} />
            )}
          </Grid>
        </Grid>
      </Grid>
      {showEditBrand && (
        <BrandObjectiveModal
          handleClose={() => setShowEditBrand(false)}
          content={brandObjective}
          handleUpdate={(content) => handleUpdate(content)}
        />
      )}
    </>
  );
};

export default CampaignOverview;
