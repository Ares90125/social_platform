/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { ResultsModal } from './modals/ResultsModal';
import { formatNumber } from '../../../../../../utils/helpers/formatNumber';

export type IUpdatedResultSection = {
  content: Content;
  supportingText?: string;
  visibleToBrand?: boolean;
};

type Content = {
  numDuringCatConversations: number;
  numBeforeCatConversations: number;
  categoryConversationVisibleToBrand?: boolean;
  numDuringBrandMentions: number;
  numBeforeBrandMentions: number;
  brandMentionsVisibleToBrand?: boolean;
  brandShareofVoiceVisibleToBrand?: boolean;
  numCommentAdminPost: number;
  numCommentUGCPost: number;
  numReactionAdminPost: number;
  numReactionUGCPost: number;
  totalReactionAndCommentsVisibleToBrand?: boolean;
  numUGCPosts: number;
  numUGCComments: number;
  ugcVisibleToBrand?: boolean;
  brandPercentageBeforeSov: number;
  brandPercentageDuringSov: number;
};

export type IUpdatedKPISection = {
  content: KPIContent;
  supportingText?: string;
  visibleToBrand?: boolean;
};

type KPIContent = {
  // Admin Post
  numAdminPostsBefore: number;
  numAdminPosts: number;
  numAdminPostsTarget: number;
  numAdminPostsVisibleToBrand: boolean;

  // Category Conversation
  numDuringCatConversations: number;
  numBeforeCatConversations: number;
  numTargetCatConversations: number;
  categoryConversationVisibleToBrand?: boolean;

  // Brand Mention
  numDuringBrandMentions: number;
  numBeforeBrandMentions: number;
  numTargetBrandMentions: number;
  brandMentionsVisibleToBrand?: boolean;

  // SOV
  brandPercentageBeforeSov: number;
  brandPercentageDuringSov: number;
  brandPercentageTargetSov: number;
  brandShareofVoiceVisibleToBrand?: boolean;

  // Total UGC
  totalUGCVisibleToBrand: boolean;
  totalUGCTarget: number;

  // UGC Posts: Comment
  numUGCCommentsBefore: number;
  numUGCCommentsTarget: number;
  numUGCComments: number;
  numUGCCommentsVisibleToBrand: boolean;

  // UGC Posts: Reactions
  numUGCPostsBefore: number;
  numUGCPostsTarget: number;
  numUGCPosts: number;
  numUGCPostsVisibleToBrand: boolean;

  // Total Reaction and Comments
  totalReactionAndCommentVisibleToBrand: boolean;
  totalReactAnCommentTarget: number;

  // Reaction and comments: Admin Post
  numReactionAndCommentAdminPostBefore: number;
  numReactionAndCommentAdminPostTarget: number;
  numReactionAndCommentAdminPost: number;
  numReactionAndCommentAdminPostVisibleToBrand: boolean;

  // Reaction an Comments: Net New Post
  numReactionAndCommentUGCPostBefore: number;
  numReactionAndCommentUGCPostTarget: number;
  numReactionAndCommentUGCPost: number;
  numReactionAndCommentUGCPostVisibleToBrand: boolean;

  // Estimated Impression
  estimateImpressionBeforeCampaign: number;
  estimateImpressionDuringCampaign: number;
  estimateImpressionTargetCampaign: number;
  estimateImpressionVisibleToBrand: boolean;

  // Total Engagement
  totalEngagementBeforeCampaign: number;
  totalEngagementDuringCampaign: number;
  totalEngagementTargetCampaign: number;
  totalEngagementVisibleToBrand: boolean;
};

const oneSectionOption = {
  chart: {
    type: 'bar',
    height: '110px',
  },
  title: {
    text: null,
  },
  xAxis: {
    categories: ['Pre-Campaign', 'Achieved'],
    title: {
      text: 'Durations',
    },
    alignTicks: 'true',
    width: '270px',
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    min: 0,
    labels: {
      overflow: 'justify',
    },
    gridLineWidth: 1,
    lineWidth: 1,
    tickAmount: 5,
  },
  tooltip: {
    // @ts-ignore
    formatter: function (tooltips, y = this.y, points = this.points) {
      return `${points[0].x}: <b>${points[0].y}</b>`;
    },
    shared: true,
  },
  plotOptions: {
    series: { borderRadius: '5px' },
    column: { colorByPoint: null },
  },
  series: [],
};

const ugcsOptions = {
  chart: {
    type: 'bar',
    height: '110px',
  },
  title: {
    text: null,
  },
  xAxis: {
    categories: ['Pre-Campaign', 'Achieved'],
    title: {
      text: 'Durations',
    },
    alignTicks: 'true',
    width: '700px',
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    min: 0,
    gridLineWidth: 1,
    lineWidth: 1,
    tickAmount: 5,
  },
  plotOptions: {
    series: { borderRadius: '5px' },
    column: { colorByPoint: null },
  },
  tooltip: {
    // @ts-ignore
    formatter: function (tooltips, y = this.y, points = this.points) {
      return `${points[0].x}: <b>${points[0].y}</b>`;
    },
    shared: true,
  },
  series: [
    {
      // name: '1800 年',
      data: [
        { color: 'rgb(155 218 178)', y: 0 },
        { color: '#27AE60', y: 1400 },
      ],
    },
  ],
};

export interface KPIResultProps {
  updateKPISupportText: Function;
  updateResultsSupportText: Function;
  results?: IUpdatedResultSection;
  kpiDetails?: IUpdatedKPISection;
}

const KPIResult: React.FC<KPIResultProps> = ({
  updateKPISupportText,
  updateResultsSupportText,
  results,
  kpiDetails,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }

  Highcharts.setOptions({ lang: { numericSymbols: undefined } });

  const [adminPostOptions, setAdminPostOptions] = useState<any>(null);
  const [categoryOptions, setCategoryOptions] = useState<any>(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState<any>(null);
  const [brandConversationOptions, setBrandConversationOptions] =
    useState<any>(null);
  const [brandSOVOptions, setBrandSOVOptions] = useState<any>(null);
  const [brandMentionOptions, setBrandMentionOptions] = useState<any>(null);
  const [totalUGCOptions, setTotalUGCOptions] = useState<any>(null);
  const [commentUGCOptions, setCommentUGCOptions] = useState<any>(null);
  const [postUGCOptions, setPostUGCOptions] = useState<any>(null);
  const [totalReactionCommentOptions, setTotalReactionCommentOptions] =
    useState<any>(null);
  const [reactionAdminOptions, setReactionAdminOptions] = useState<any>(null);
  const [reactionPostOptions, setReactionPostOptions] = useState<any>(null);
  const [impressionOptions, setImpressionOptions] = useState<any>(null);
  const [engagementOptions, setEngagementOptions] = useState<any>(null);

  const [resultTextCancek, setResultTextCancel] = useState('');
  const [resultAction, setResultAction] = useState('');
  const [resultCallAction, setResultCallAction] = useState(true);
  const [reultSave, setReultSave] = useState('');

  const [view, setView] = useState(true);

  const [kpi, setKpi] = useState(true);
  const [showEditSupportingText, setShowEditSupportingText] = useState(true);
  const [supportingText, setSupportingText] = useState('');

  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    if (kpiDetails) {
      setAdminPostOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.numAdminPostsBefore,
              },
              { color: '#27AE60', y: kpiDetails.content.numAdminPosts },
            ],
          },
        ],
      });
      setCategoryOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              { color: 'rgb(155 218 178)', y: 0 },
              {
                color: '#27AE60',
                y: kpiDetails.content.numDuringCatConversations,
              },
            ],
          },
        ],
      });
      setSubCategoryOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              { color: 'rgb(155 218 178)', y: 0 },
              { color: '#27AE60', y: 1400 },
            ],
          },
        ],
      });
      setBrandConversationOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              { color: 'rgb(155 218 178)', y: 0 },
              { color: '#27AE60', y: 1400 },
            ],
          },
        ],
      });
      setBrandSOVOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.brandPercentageBeforeSov,
              },
              {
                color: '#27AE60',
                y: kpiDetails.content.brandPercentageDuringSov,
              },
            ],
          },
        ],
      });
      setBrandMentionOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.numBeforeBrandMentions,
              },
              {
                color: '#27AE60',
                y: kpiDetails.content.numDuringBrandMentions,
              },
            ],
          },
        ],
      });
      setTotalUGCOptions({
        ...ugcsOptions,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y:
                  kpiDetails.content.numUGCCommentsBefore +
                  kpiDetails.content.numUGCPostsBefore,
              },
              {
                color: '#27AE60',
                y:
                  kpiDetails.content.numUGCComments +
                  kpiDetails.content.numUGCPosts,
              },
            ],
          },
        ],
      });
      setCommentUGCOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.numUGCCommentsBefore,
              },
              { color: '#27AE60', y: kpiDetails.content.numUGCComments },
            ],
          },
        ],
      });
      setPostUGCOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.numUGCPostsBefore,
              },
              { color: '#27AE60', y: kpiDetails.content.numUGCPosts },
            ],
          },
        ],
      });
      setTotalReactionCommentOptions({
        ...ugcsOptions,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y:
                  kpiDetails.content.numReactionAndCommentAdminPostBefore +
                  kpiDetails.content.numReactionAndCommentUGCPostBefore,
              },
              {
                color: '#27AE60',
                y:
                  kpiDetails.content.numReactionAndCommentAdminPost +
                  kpiDetails.content.numReactionAndCommentUGCPost,
              },
            ],
          },
        ],
      });
      setReactionAdminOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.numReactionAndCommentAdminPostBefore,
              },
              {
                color: '#27AE60',
                y: kpiDetails.content.numReactionAndCommentAdminPost,
              },
            ],
          },
        ],
      });
      setReactionPostOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.numReactionAndCommentUGCPostBefore,
              },
              {
                color: '#27AE60',
                y: kpiDetails.content.numReactionAndCommentUGCPost,
              },
            ],
          },
        ],
      });
      setImpressionOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.estimateImpressionBeforeCampaign,
              },
              {
                color: '#27AE60',
                y: kpiDetails.content.estimateImpressionDuringCampaign,
              },
            ],
          },
        ],
      });
      setEngagementOptions({
        ...oneSectionOption,
        series: [
          {
            data: [
              {
                color: 'rgb(155 218 178)',
                y: kpiDetails.content.totalEngagementBeforeCampaign,
              },
              {
                color: '#27AE60',
                y: kpiDetails.content.totalEngagementDuringCampaign,
              },
            ],
          },
        ],
      });
    }
  }, [kpiDetails]);

  const showResultEditModal = () => {
    setShowResultModal(true);
  };

  const addResultAction = () => {
    setResultCallAction(false);
  };
  const saveResultAction = () => {
    setResultAction(reultSave);
    setResultCallAction(true);
  };
  const cancelResultAction = () => {
    setResultCallAction(true);
  };
  const changeResultAction = (e) => {
    setReultSave(e.target.value);
  };
  const showChartView = () => {
    setView(false);
  };
  const hiddenView = () => {
    setView(true);
  };

  const addKpi = () => {
    setKpi(false);
  };
  const addKpiAction = () => {
    setShowEditSupportingText(false);
  };
  const changeKpiAction = (e) => {
    setSupportingText(e.target.value);
  };
  const saveKpiAction = () => {
    setShowEditSupportingText(false);
    updateKPISupportText(supportingText);
  };
  const cancelKpiAction = () => {
    setShowEditSupportingText(false);
  };

  return (
    <>
      <Grid
        className={styles.phase_card}
        sx={{ paddingTop: '32px' }}
        id="results"
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
                    Result
                  </Grid>
                  <Grid
                    item
                    onClick={showResultEditModal}
                    className={styles.edit}
                  >
                    Edit
                  </Grid>
                  <Grid
                    item
                    onClick={showResultEditModal}
                    sx={{ marginTop: '2px' }}
                  >
                    <img className={styles.pen} src="/images/pen.jpg" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ marginTop: '-7px' }}>
                <Switch {...label} checked={results?.visibleToBrand} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item className={styles.result_card}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item sx={{ marginBottom: '3px' }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ width: '244px' }}
                    >
                      <Grid item className={styles.total}>
                        CATEGORY CONVERSATIONS
                      </Grid>
                      <Grid item sx={{ marginTop: '-5px' }}>
                        <Switch
                          {...label}
                          size="small"
                          checked={
                            results?.content.categoryConversationVisibleToBrand
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item className={styles.num}>
                        {formatNumber(
                          results?.content.numDuringCatConversations,
                        )}
                      </Grid>
                      <Grid
                        item
                        className={clsx(
                          styles.float_public,
                          results &&
                            results?.content.numDuringCatConversations -
                              results?.content.numBeforeCatConversations >
                              0
                            ? styles.rising
                            : styles.falling,
                        )}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid item sx={{ margin: '0 4.94px' }}>
                            {results &&
                            results?.content.numDuringCatConversations -
                              results?.content.numBeforeCatConversations >
                              0 ? (
                                <img src="/images/rising.jpg" />
                            ) : (
                              <img src="/images/falling.jpg" />
                            )}
                          </Grid>
                          <Grid item>
                            {results &&
                              formatNumber(
                                results?.content.numDuringCatConversations -
                                  results?.content.numBeforeCatConversations,
                              )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={styles.prev}>
                        (prev:
                        {formatNumber(
                          results?.content.numBeforeCatConversations,
                        )}
                        )
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={styles.result_card}
                sx={{ margin: '0 7px' }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item sx={{ marginBottom: '3px' }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ width: '244px' }}
                    >
                      <Grid item className={styles.total}>
                        BRAND MENTIONS
                      </Grid>
                      <Grid item sx={{ marginTop: '-5px' }}>
                        <Switch
                          {...label}
                          size="small"
                          checked={results?.content.brandMentionsVisibleToBrand}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item className={styles.num}>
                        {formatNumber(results?.content.numDuringBrandMentions)}
                      </Grid>
                      <Grid
                        item
                        className={clsx(
                          styles.float_public,
                          results &&
                            results?.content.numDuringCatConversations -
                              results?.content.numBeforeCatConversations >
                              0
                            ? styles.rising
                            : styles.falling,
                        )}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid item sx={{ margin: '0 4.94px' }}>
                            {results &&
                            results?.content.numDuringCatConversations -
                              results?.content.numBeforeCatConversations >
                              0 ? (
                                <img src="/images/rising.jpg" />
                            ) : (
                              <img src="/images/falling.jpg" />
                            )}
                          </Grid>
                          <Grid item>
                            {results &&
                              formatNumber(
                                results?.content.numDuringBrandMentions -
                                  results?.content.numBeforeBrandMentions,
                              )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={styles.prev}>
                        (prev:
                        {formatNumber(results?.content.numBeforeBrandMentions)})
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={styles.result_card}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item sx={{ marginBottom: '3px' }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ width: '244px' }}
                    >
                      <Grid item className={styles.total}>
                        BRAND SHARE OF VOICE
                      </Grid>
                      <Grid item sx={{ marginTop: '-5px' }}>
                        <Switch
                          {...label}
                          size="small"
                          checked={
                            results?.content.brandShareofVoiceVisibleToBrand
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item className={styles.num}>
                        {results?.content.brandPercentageDuringSov}%
                      </Grid>
                      <Grid
                        item
                        className={clsx(
                          styles.float_public,
                          results &&
                            results?.content.numDuringCatConversations -
                              results?.content.numBeforeCatConversations >
                              0
                            ? styles.rising
                            : styles.falling,
                        )}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid item sx={{ margin: '0 4.94px' }}>
                            {results &&
                            results?.content.numDuringCatConversations -
                              results?.content.numBeforeCatConversations >
                              0 ? (
                                <img src="/images/rising.jpg" />
                            ) : (
                              <img src="/images/falling.jpg" />
                            )}
                          </Grid>
                          <Grid item>
                            {results &&
                              results?.content.brandPercentageDuringSov -
                                results?.content.brandPercentageBeforeSov}
                            %
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={styles.prev}>
                        (prev:{results?.content.brandPercentageBeforeSov}%)
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={styles.resultCard}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item sx={{ marginBottom: '5px' }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ width: '244px' }}
                    >
                      <Grid item className={styles.total}>
                        USER GENERATED CONTENT(UGC)
                      </Grid>
                      <Grid item sx={{ marginTop: '-5px' }}>
                        <Switch
                          {...label}
                          size="small"
                          checked={results?.content.ugcVisibleToBrand}
                        />
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
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid
                            item
                            className={styles.num}
                            sx={{ marginRight: '4px' }}
                          >
                            {formatNumber(results?.content.numUGCComments)}
                          </Grid>
                          <Grid item className={styles.span}>
                            Comments
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid
                            item
                            className={styles.num}
                            sx={{ marginRight: '4px' }}
                          >
                            {formatNumber(results?.content.numUGCPosts)}
                          </Grid>
                          <Grid item className={styles.span}>
                            Net new posts
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={styles.resultBigCard}
                sx={{ marginLeft: '8px' }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item sx={{ marginBottom: '5px' }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ width: '518px' }}
                    >
                      <Grid item className={styles.total}>
                        TOTAL REACTION & COMMENTS:{' '}
                        <span className={styles.resultBigCard_num}>
                          {results &&
                            formatNumber(
                              results?.content.numReactionAdminPost +
                                results?.content.numReactionUGCPost +
                                results?.content.numCommentAdminPost +
                                results?.content.numCommentUGCPost,
                            )}
                        </span>
                      </Grid>
                      <Grid item sx={{ marginTop: '-5px' }}>
                        <Switch
                          {...label}
                          size="small"
                          checked={
                            results?.content
                              .totalReactionAndCommentsVisibleToBrand
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid item className={styles.resultBigCard_num}>
                            Admin Posts
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                            >
                              <Grid item sx={{ marginRight: '16px' }}>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="flex-start"
                                  alignItems="flex-start"
                                >
                                  <Grid
                                    item
                                    className={styles.num}
                                    sx={{ marginRight: '4px' }}
                                  >
                                    {formatNumber(
                                      results?.content.numReactionAdminPost,
                                    )}
                                  </Grid>
                                  <Grid item className={styles.span}>
                                    Reactions
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="flex-start"
                                  alignItems="flex-start"
                                >
                                  <Grid
                                    item
                                    className={styles.num}
                                    sx={{ marginRight: '4px' }}
                                  >
                                    {formatNumber(
                                      results?.content.numCommentAdminPost,
                                    )}
                                  </Grid>
                                  <Grid item className={styles.span}>
                                    Comments
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={styles.diriver} />
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid item className={styles.resultBigCard_num}>
                            UGC Posts
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                            >
                              <Grid item sx={{ marginRight: '16px' }}>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="flex-start"
                                  alignItems="flex-start"
                                >
                                  <Grid
                                    item
                                    className={styles.num}
                                    sx={{ marginRight: '4px' }}
                                  >
                                    {formatNumber(
                                      results?.content.numReactionUGCPost,
                                    )}
                                  </Grid>
                                  <Grid item className={styles.span}>
                                    Reactions
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="flex-start"
                                  alignItems="flex-start"
                                >
                                  <Grid
                                    item
                                    className={styles.num}
                                    sx={{ marginRight: '4px' }}
                                  >
                                    {formatNumber(
                                      results?.content.numCommentUGCPost,
                                    )}
                                  </Grid>
                                  <Grid item className={styles.span}>
                                    Comments
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {resultCallAction ? (
              <div>
                {resultAction === '' ? (
                  <Grid className={styles.add_key} onClick={addResultAction}>
                    + Add supporting text
                  </Grid>
                ) : (
                  <Grid item className={styles.font}>
                    {resultAction}
                  </Grid>
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
                      onChange={changeResultAction}
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
                          onClick={saveResultAction}
                        >
                          Save
                        </button>
                      </Grid>
                      <Grid item>
                        <button
                          className={clsx(styles.cancelh, styles.button)}
                          onClick={cancelResultAction}
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
      {view ? (
        <Grid className={styles.char_card}>
          <Grid sx={{ cursor: 'pointer' }} onClick={showChartView}>
            <span className={styles.view}>View All KPI Charts</span>
            <img className={styles.icon} src="/images/menuToggle.jpg" />
          </Grid>
        </Grid>
      ) : (
        <Grid className={styles.hide_all}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item className={styles.hide_title} onClick={hiddenView}>
              <span className={styles.view}>Hide all KPI Charts</span>
              <img className={styles.icon} src="/images/upArrow.jpg" />
            </Grid>
            <Grid item className={styles.kpi_all}>
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
                        alignItems="center"
                      >
                        <Grid item className={styles.num}>
                          KPIs
                        </Grid>
                        <Grid item onClick={addKpi} className={styles.edit}>
                          Edit
                        </Grid>
                        <Grid item onClick={addKpi}>
                          <img className={styles.pen} src="/images/pen.jpg" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ marginTop: '-7px' }}>
                      <Switch {...label} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={styles.target}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={styles.square} />
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid item className={styles.target_span}>
                          Target set for each KPI
                        </Grid>
                        <Grid item className={styles.introduction}>
                          The total number of admin posts that include the
                          campaign hashtag
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid
                      item
                      className={styles.admin_card}
                      sx={{ marginRight: '16px' }}
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
                            direction="row"
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Admin Posts
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .numAdminPostsVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The total number of admin posts that include the
                          campaign hashtag
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {adminPostOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={adminPostOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={styles.admin_card}>
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
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Category Conversations
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .categoryConversationVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The total number of posts and comments for the
                          campaign c...(more)
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {categoryOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={categoryOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid
                      item
                      className={styles.admin_card}
                      sx={{ marginRight: '16px' }}
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
                            direction="row"
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Subcategory Conversations
                            </Grid>
                            <Grid item>
                              <Switch {...label} size="small" />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The total number of posts and comments for the
                          campaign...(more)
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {subCategoryOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={subCategoryOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={styles.admin_card}>
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
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Brand Conversations
                            </Grid>
                            <Grid item>
                              <Switch {...label} size="small" />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The sum all posts that have brand mentions with the
                          comm...(more)
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {brandConversationOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={brandConversationOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid
                      item
                      className={styles.admin_card}
                      sx={{ marginRight: '16px' }}
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
                            direction="row"
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Brand Share of Voice
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .brandShareofVoiceVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The overall share of your brand mentions in comparison
                          to ot...(more)
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {brandSOVOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={brandSOVOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={styles.admin_card}>
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
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Brand Mentions
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .brandMentionsVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The total number of posts and comments containing your
                          br...(more)
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {brandMentionOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={brandMentionOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={styles.closed}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
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
                            sx={{ width: '788px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Total UGCs
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content.totalUGCVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The total number of UGC posts and UGC comments during
                          the campaign
                        </Grid>
                        <Grid item sx={{ width: '700px', marginLeft: '-12px' }}>
                          {totalUGCOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={totalUGCOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={styles.driver} />
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid
                          item
                          className={styles.closed_card}
                          sx={{ marginRight: '16px' }}
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
                                direction="row"
                                sx={{ width: '370px' }}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item className={styles.admin_title}>
                                  UGC - Comments
                                </Grid>
                                <Grid item>
                                  <Switch
                                    {...label}
                                    checked={
                                      kpiDetails?.content
                                        .numUGCCommentsVisibleToBrand
                                    }
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className={styles.span}>
                              The count of comments on all UGC posts
                            </Grid>
                            <Grid
                              item
                              sx={{ width: '360px', marginLeft: '-12px' }}
                            >
                              {commentUGCOptions && (
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={commentUGCOptions}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.closed_rightcard}>
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
                                sx={{ width: '370px' }}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item className={styles.admin_title}>
                                  UGC - Net New Posts
                                </Grid>
                                <Grid item>
                                  <Switch
                                    {...label}
                                    checked={
                                      kpiDetails?.content
                                        .numUGCPostsVisibleToBrand
                                    }
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className={styles.span}>
                              The total number of UGC posts that include the
                              campaign hashtag
                            </Grid>
                            <Grid
                              item
                              sx={{ width: '360px', marginLeft: '-12px' }}
                            >
                              {postUGCOptions && (
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={postUGCOptions}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={styles.closed}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
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
                            sx={{ width: '788px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Total Reactions & Comments
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .totalReactionAndCommentVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          The count of all comments and reactions on both Admin
                          posts and UGC posts
                        </Grid>
                        <Grid item sx={{ width: '700px', marginLeft: '-12px' }}>
                          {totalReactionCommentOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={totalReactionCommentOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={styles.driver} />
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid
                          item
                          className={styles.closed_card}
                          sx={{ marginRight: '16px' }}
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
                                direction="row"
                                sx={{ width: '370px' }}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item className={styles.admin_title}>
                                  Reactions & Comments - Admin Posts
                                </Grid>
                                <Grid item>
                                  <Switch
                                    {...label}
                                    checked={
                                      kpiDetails?.content
                                        .numReactionAndCommentAdminPostVisibleToBrand
                                    }
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className={styles.span}>
                              The count of reactions and comments on all admin
                              posts tha...(more)
                            </Grid>
                            <Grid
                              item
                              sx={{ width: '360px', marginLeft: '-12px' }}
                            >
                              {reactionAdminOptions && (
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={reactionAdminOptions}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.closed_rightcard}>
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
                                sx={{ width: '370px' }}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item className={styles.admin_title}>
                                  Reactions & Comments - Net New Posts
                                </Grid>
                                <Grid item>
                                  <Switch
                                    {...label}
                                    checked={
                                      kpiDetails?.content
                                        .numReactionAndCommentUGCPostVisibleToBrand
                                    }
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className={styles.span}>
                              The count of reactions and comments on all net new
                              UGC posts
                            </Grid>
                            <Grid
                              item
                              sx={{ width: '360px', marginLeft: '-12px' }}
                            >
                              {reactionPostOptions && (
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={reactionPostOptions}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ marginBottom: '16px' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid
                      item
                      className={styles.admin_card}
                      sx={{ marginRight: '16px' }}
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
                            direction="row"
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Estimated Impressions
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .estimateImpressionVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          An estimated reach of all posts that include the
                          campaign hashtag
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {impressionOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={impressionOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={styles.admin_card}>
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
                            sx={{ width: '370px' }}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item className={styles.admin_title}>
                              Total Engagement
                            </Grid>
                            <Grid item>
                              <Switch
                                {...label}
                                checked={
                                  kpiDetails?.content
                                    .totalEngagementVisibleToBrand
                                }
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={styles.span}>
                          An estimate of total engagement by the campaign that
                          inclu...(more)
                        </Grid>
                        <Grid item sx={{ width: '360px', marginLeft: '-12px' }}>
                          {engagementOptions && (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={engagementOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {showEditSupportingText ? (
                    <div>
                      {resultAction === '' ? (
                        <Grid
                          className={styles.add_key}
                          sx={{ marginTop: '24px' }}
                          onClick={addKpiAction}
                        >
                          + Add supporting text
                        </Grid>
                      ) : (
                        <>
                          <Grid item className={styles.font}>
                            {resultAction}
                          </Grid>
                          <Grid
                            item
                            onClick={addKpiAction}
                            className={styles.twoedit}
                            sx={{ marginBottom: '20px' }}
                          >
                            <img className={styles.pen} src="/images/pen.jpg" />
                            <span style={{ lineHeight: '40px' }}>
                              Edit Text
                            </span>
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
                            value={supportingText}
                            onChange={changeKpiAction}
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
                                onClick={saveKpiAction}
                              >
                                Save
                              </button>
                            </Grid>
                            <Grid item>
                              <button
                                className={clsx(styles.cancelh, styles.button)}
                                onClick={cancelKpiAction}
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
            <Grid item onClick={hiddenView}>
              <img className={styles.upArrow} src="/images/upArrow.jpg" />
            </Grid>
          </Grid>
        </Grid>
      )}
      {showResultModal && (
        <ResultsModal
          handleClose={() => setShowResultModal(false)}
          results={results}
          open
        />
      )}
    </>
  );
};

export default KPIResult;
