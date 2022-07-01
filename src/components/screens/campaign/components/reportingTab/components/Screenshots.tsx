/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import { useQuery } from 'react-query';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import {
  getScreenshotUploadData,
  ScreenshotType,
} from '../../../../../../graphs/getScreenshotUploadData';
import { getCampaignPosts } from '../../../../../../graphs/getCampaignPosts';

type ScreenshotsProp = {
  campaign?: CampaignInputs;
  updateSupportText: Function;
  s3Info?: TopPerformingPostSection | null;
  toggleChecked: Function;
};

type CampaignPost = {
  id: string;
  campaignId: string;
  sourceId: string;
  fbPermlink: string | null;
  reactionCount: number | null;
  commentCount: number | null;
  createdAtUTC: string;
  updatedAtUTC: string;
  groupName: string;
  postCreatedAtUTC: string;
  postCreatedByName: string;
  postRawText: string;
  postPhotoUrl: string;
};

export interface TopPerformingPost extends CampaignPost, ScreenshotType {
  id: string;
  visibleToBrand?: boolean;
  order?: number;
  groupname?: string;
  type?: string;
  isSystemGenerated?: boolean;
}

export interface TopPerformingPostSection {
  supportingText?: string;
  visibleToBrand?: boolean;
  posts: TopPerformingPost[];
}

const Screenshots: React.FC<ScreenshotsProp> = ({
  campaign,
  updateSupportText,
  s3Info,
  toggleChecked,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [top, setTop] = useState(true);
  const [topSpan, setTopSpan] = useState(
    'Top keywords that were trending before and during the campaign',
  );
  const [topSpanCancel, setTopSpanCancel] = useState('');
  const [performing, setPerforming] = useState(true);
  const [performingText, setPerformingText] = useState(s3Info?.supportingText);
  const [admin, setAdmin] = useState(true);

  const [ugc, setUgc] = useState(false);

  const [allPosts, setAllPosts] = useState<Array<TopPerformingPost>>([]);
  const [selectedPosts, setSelectedPosts] = useState<Array<TopPerformingPost>>(
    [],
  );

  const { refetch: fetchScreenshots } = useQuery(
    'getScreenshotUploadData',
    () => {
      if (campaign) {
        return getScreenshotUploadData(
          `${campaign.campaignId}_allPosts`,
          20,
          '',
        );
      }
      return null;
    },
    {},
  );

  const { refetch: fetchCampaignPosts } = useQuery('getCampaignPosts', () => {
    if (campaign) {
      return getCampaignPosts(campaign.campaignId, 50, '');
    }
    return null;
  });

  const fetchScreenshotInfo = async () => {
    const { data: screenshotResponse } = await fetchScreenshots();
    const { data: postResponse } = await fetchCampaignPosts();

    let allPosts: Array<any> = [];
    if (screenshotResponse?.items) {
      allPosts = allPosts.concat(
        screenshotResponse.items.map((obj) => ({
          ...obj,
          visibleToBrand: true,
        })),
      );
    }
    if (postResponse?.items) {
      postResponse.items.forEach((post, i) => {
        allPosts.push({
          ...post,
          visibleToBrand: true,
          order: i + 1,
        } as TopPerformingPost);
      });
    }

    // const obj: TopPerformingPostSection = {
    //   supportingText: campaign?.topPerformingPostSupportingText || '',
    //   visibleToBrand: true,
    //   posts: allPosts,
    // };

    setAllPosts(allPosts);
    setSelectedPosts(allPosts);
    console.log(selectedPosts);
  };

  useEffect(() => {
    if (campaign) {
      fetchScreenshotInfo();
      if (campaign.topPerformingPostSupportingText) {
        setPerformingText(campaign.topPerformingPostSupportingText);
      }
    }
  }, [campaign]);

  const addTopSpan = () => {
    setTop(false);
  };
  const changeTopSpan = (e) => {
    setTopSpanCancel(e.target.value);
  };
  const saveTopSpan = () => {
    setTopSpan(topSpanCancel);
    setTop(true);
  };
  const cancelTopSpan = () => {
    setTop(true);
  };
  const addPerformingText = () => {
    setPerforming(false);
  };
  const savePerformingText = () => {
    setPerforming(true);
    updateSupportText(performingText);
  };
  const cancelPerformingText = () => {
    setPerforming(true);
  };
  const changePerformingText = (e) => {
    setPerformingText(e.target.value);
  };

  const changeAdminState = () => {
    if (admin) {
      updateSelectedPosts(false, ugc);
      setAdmin(false);
    } else {
      updateSelectedPosts(true, ugc);
      setAdmin(true);
    }
  };
  const changeUgcState = () => {
    if (ugc) {
      updateSelectedPosts(admin, false);
      setUgc(false);
    } else {
      updateSelectedPosts(admin, true);
      setUgc(true);
    }
  };

  const updateSelectedPosts = (adminSelected, ugcSelected) => {
    const filteredPosts = allPosts
      .filter((post) => {
        if (!post.visibleToBrand) {
          return false;
        }

        if (adminSelected && ugcSelected) {
          if (!post.isSystemGenerated) {
            return false;
          }
          return true;
        }
        // if (adminSelected) {
        //   if (post.isAdminPost != 'true') {
        //     return false;
        //   }
        // }
        // if (ugcSelected) {
        //   if (post.isAdminPost && post.isAdminPost != 'false') {
        //     return false;
        //   }
        // }
        return true;
      })
      .sort((postA, postB) => postA.order! - postB.order!);

    setSelectedPosts(filteredPosts);
  };

  // const fetchScreenshotURL = async () => {};

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="topPosts"
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Grid
            container
            sx={{ width: '820px' }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.num}>
                  Top Performing Posts
                </Grid>
                <Grid item onClick={addTopSpan} className={styles.edit}>
                  Edit
                </Grid>
                <Grid item onClick={addTopSpan} sx={{ marginTop: '2px' }}>
                  <img className={styles.pen} src="/images/pen.jpg" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: '-7px' }}>
              <Switch
                {...label}
                checked={s3Info?.visibleToBrand}
                onChange={(e, value) => toggleChecked(value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.span}>
          {top ? (
            <Grid item className={styles.span}>
              {topSpan === '' ? (
                <Grid className={styles.add} onClick={addTopSpan}>
                  + Add supporting text
                </Grid>
              ) : (
                topSpan
              )}
            </Grid>
          ) : (
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <textarea
                    onChange={changeTopSpan}
                    className={styles.textarea}
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
                      <button
                        className={clsx(styles.saveh, styles.button)}
                        onClick={saveTopSpan}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelTopSpan}
                      >
                        Cancel
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ width: '820px' }}
          >
            <Grid item sx={{ marginBottom: '24px' }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ marginTop: '20px' }}
              >
                <Grid item>
                  <button
                    onClick={changeAdminState}
                    className={admin ? styles.admin_posts : styles.admin_ugc}
                  >
                    {admin ? <span>✓</span> : ''}Admin Posts
                  </button>
                </Grid>
                <Grid item>
                  <button
                    onClick={changeUgcState}
                    className={ugc ? styles.admin_posts : styles.admin_ugc}
                  >
                    {ugc ? <span>✓</span> : ''}UGC
                  </button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.upload}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <img src="/images/uploadScreenshots.jpg" />
                </Grid>
                <Grid item className={styles.screenshots}>
                  Upload Screenshots
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.top_card}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item sx={{ marginRight: '18px' }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.kids}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={styles.title}>
                      Kids' learning and Milestones(5-10 Year)
                    </Grid>
                    <Grid item className={styles.span}>
                      Post
                    </Grid>
                    <Grid item className={styles.card}>
                      <img src="/images/postPhoto1.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginRight: '16px' }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.kids_small}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={styles.title}>
                      Kids' learning and Milestones(5-10 Year)
                    </Grid>
                    <Grid item className={styles.span}>
                      Post
                    </Grid>
                    <Grid item className={styles.card_small}>
                      <img src="/images/postPhoto2.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={styles.kids_small}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={styles.title}>
                      Weight Gain for Kids
                    </Grid>
                    <Grid item className={styles.span}>
                      Comment
                    </Grid>
                    <Grid item className={styles.card_small}>
                      <img src="/images/postPhoto2.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.kids}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={styles.title}>
                      Kids' learning and Milestones(5-10 Year)
                    </Grid>
                    <Grid item className={styles.span}>
                      Post
                    </Grid>
                    <Grid item className={styles.card}>
                      <img src="/images/postPhoto3.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {performing ? (
            <div>
              {performingText === '' ? (
                <Grid className={styles.add_key} onClick={addPerformingText}>
                  + Add supporting text
                </Grid>
              ) : (
                <>
                  <Grid item className={styles.font}>
                    {performingText}
                  </Grid>
                  <Grid
                    item
                    onClick={addPerformingText}
                    className={styles.twoedit}
                    sx={{ marginBottom: '20px' }}
                  >
                    <img className={styles.pen} src="/images/pen.jpg" />
                    <span style={{ lineHeight: '40px' }}>Edit Text</span>
                  </Grid>
                </>
              )}
            </div>
          ) : (
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <textarea
                    value={performingText}
                    onChange={changePerformingText}
                    className={styles.textarea}
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
                      <button
                        className={clsx(styles.saveh, styles.button)}
                        onClick={savePerformingText}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelPerformingText}
                      >
                        Cancel
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Screenshots;
