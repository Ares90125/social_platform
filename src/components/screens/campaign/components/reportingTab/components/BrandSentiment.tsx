/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CMCReportMetricsV2 } from '../../../../../../graphs/getCMCReportMetricsV2';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { SentimentModal } from './modals/SentimentModal';

export interface BrandSentitmentSection {
  content: BrandSentimentContent;
  visibleToBrand: boolean;
  supportingText?: string;
}

export interface BrandSentimentContent {
  beforeSentimentMap: {
    likePercentage?: number;
    dislikePercentage?: number;
    neutralPercentage?: number;
  };
  beforeSentimentMapVisibleToBrand?: boolean;
  duringSentimentMap: {
    likePercentage?: number;
    dislikePercentage?: number;
    neutralPercentage?: number;
  };
  duringSentimentMapVisibleToBrand?: boolean;

  afterSentimentMap: {
    likePercentage?: number;
    dislikePercentage?: number;
    neutralPercentage?: number;
  };
  afterSentimentMapVisibleToBrand?: boolean;
  referenceConversations: {
    beforeSentimentMap: {
      Positive: boolean;
      Negative: boolean;
      Neutral: boolean;
    };
    duringSentimentMap: {
      Positive: boolean;
      Negative: boolean;
      Neutral: boolean;
    };
    afterSentimentMap: {
      Positive: boolean;
      Negative: boolean;
      Neutral: boolean;
    };
  };
}

const preOption = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Pre-Campaign',
    y: 330,
    style: {
      color: '#707084',
      fontSize: '14px',
      lineHeight: '16px',
    },
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
  tooltip: {
    formatter() {
      // @ts-ignore
      return `<b>${this.point.name}</b>: ${Highcharts.numberFormat(
        // @ts-ignore
        this.percentage,
        1,
      )}% `;
    },
  },
 
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: [],
    },
  ],
};
const duringOption = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'During Campaign',
    y: 330,
    style: {
      color: '#707084',
      fontSize: '14px',
      lineHeight: '16px',
    },
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
  tooltip: {
    formatter() {
      // @ts-ignore
      return `<b>${this.point.name}</b>: ${Highcharts.numberFormat(
        // @ts-ignore
        this.percentage,
        1,
      )}% `;
    },
  },
  
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: [],
    },
  ],
};
const postOption = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Post-Campaign',
    y: 330,
    style: {
      color: '#707084',
      fontSize: '14px',
      lineHeight: '16px',
    },
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
  tooltip: {
    formatter() {
      // @ts-ignore
      return `<b>${this.point.name}</b>: ${Highcharts.numberFormat(
        // @ts-ignore
        this.percentage,
        1,
      )}% `;
    },
  },
  
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: [],
    },
  ],
};

type GraphDataType = {
  name: string;
  y: number | null;
  color: string;
};

type SentimentProp = {
  toggleSlider:Function,
  campaign?: CampaignInputs;
  campaignS3Info?: CMCReportMetricsV2;
  updateSupportText: Function;
  s3Info?: BrandSentitmentSection | null;
};

const BrandSentiment: React.FC<SentimentProp> = ({
  toggleSlider,
  campaign,
  campaignS3Info,
  updateSupportText,
  s3Info,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [preCampaignInfo, setPreCampaignInfo] = useState<any>(null);
  const [duringCampaignInfo, setDuringCampaignInfo] = useState<any>(null);
  const [postCampaignInfo, setPostCampaignInfo] = useState<any>(null);

  const [sentimentArray, setSentimentArray] = useState<Array<any>>([]);

  const [supportText, setSupportText] = useState('');
  const [showEditSupportText, setShowEditSupportText] = useState(false);

  const [showEditSentiment, setShowEditSentiment] = useState(false);

  useEffect(() => {
    if (campaignS3Info) {
      const preData = getSentimentGraphInfo(campaignS3Info.beforeSentimentMap);
      const duringData = getSentimentGraphInfo(
        campaignS3Info.duringSentimentMap,
      );
      const postData = getSentimentGraphInfo(campaignS3Info.afterSentimentMap);

      setSentimentArray([
        {
          title: 'Pre-campaign',
          ...getModalValue(campaignS3Info.beforeSentimentMap),
        },
        {
          title: 'During-campaign',
          ...getModalValue(campaignS3Info.duringSentimentMap),
        },
        {
          title: 'Post-campaign',
          ...getModalValue(campaignS3Info.afterSentimentMap),
        },
      ]);
      setPreCampaignInfo({
        ...preOption,
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              align: '',
              formatter() {
                // @ts-ignore
                return `${this.point.y}%`;
              },
              distance: '-30%',
            },
            showInLegend: true,
            size: 200,
            point: {
              events: {
                click: (e) => {toggleSlider(true,{"title":"Brand Sentiment","category":"Pre-Campaign","percent":e.point.y,"name":e.point.options.name});}
              }
            }
          },
         
        },
        series: [
          {
            name: 'Brands',
            colorByPoint: true,
            data: preData,
          },
        ],
      });
      setDuringCampaignInfo({
        ...duringOption,
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              align: '',
              formatter() {
                // @ts-ignore
                return `${this.point.y}%`;
              },
              distance: '-30%',
            },
            showInLegend: true,
            size: 200,
            point: {
              events: {
                click: (e) => {toggleSlider(true,{"title":"Brand Sentiment","category":"During-Campaign","percent":e.point.y,"name":e.point.options.name});}
              }
            }
          },
          
        },
        series: [
          {
            name: 'Brands',
            colorByPoint: true,
            data: duringData,
          },
        ],
      });
      setPostCampaignInfo({
        ...postOption,
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              align: '',
              formatter() {
                // @ts-ignore
                return `${this.point.y}%`;
              },
              distance: '-30%',
            },
            showInLegend: true,
            size: 200,
            point: {
              events: {
                click: (e) => {toggleSlider(true,{"title":"Brand Sentiment","category":"Post-Campaign","percent":e.point.y,"name":e.point.options.name});}
              }
            }
          },
          
        },
        series: [
          {
            name: 'Brands',
            colorByPoint: true,
            data: postData,
          },
        ],
      });
    }
  }, [campaignS3Info]);

  useEffect(() => {
    if (campaign && campaign?.brandSentimentSupportingText) {
      setSupportText(campaign?.brandSentimentSupportingText);
    }
  }, [campaign]);

  const getModalValue = (json: string) => {
    const sentimentInfo = JSON.parse(json);
    let total = 0;
    Object.keys(sentimentInfo).map((key) => {
      total += sentimentInfo[key];
    });
    const result = {
      Positive: 0,
      Neutral: 0,
      Negative: 0,
    };
    Object.keys(sentimentInfo).map((key) => {
      if (key === 'like') {
        result.Positive =
          total > 0 ? Math.floor((sentimentInfo[key] / total) * 100) : 0;
      }
      if (key === 'neutral') {
        result.Neutral =
          total > 0 ? Math.floor((sentimentInfo[key] / total) * 100) : 0;
      }
      if (key === 'dislike') {
        result.Negative =
          total > 0 ? Math.floor((sentimentInfo[key] / total) * 100) : 0;
      }
    });

    return result;
  };

  const getSentimentGraphInfo = (json: string) => {
    const sentimentInfo = JSON.parse(json);
    let total = 0;
    Object.keys(sentimentInfo).map((key) => {
      total += sentimentInfo[key];
    });
    const result: Array<GraphDataType> = [];
    Object.keys(sentimentInfo).map((key) => {
      if (key === 'like') {
        result.push({
          name: 'Positive',
          y: total > 0 ? (Math.floor((sentimentInfo[key] / total) * 100) === 0 ? null : Math.floor((sentimentInfo[key] / total) * 100)) : 0,
          color: '#98DF8A',
        });
      }
      if (key === 'neutral') {
        result.push({
          name: 'Neutral',
          y: total > 0 ? (Math.floor((sentimentInfo[key] / total) * 100) === 0 ? null : Math.floor((sentimentInfo[key] / total) * 100)) : 0,
          color: '#FAF1A2',
        });
      }
      if (key === 'dislike') {
        result.push({
          name: 'Negative',
          y: total > 0 ? (Math.floor((sentimentInfo[key] / total) * 100) === 0 ? null : Math.floor((sentimentInfo[key] / total) * 100)) : 0,
          color: '#F99999',
        });
      }
    });

    return result;
  };

  const saveSupportText = () => {
    setShowEditSupportText(false);
    updateSupportText(supportText);
  };

  const cancelSupportText = () => {
    if (campaign && campaign?.brandSentimentSupportingText) {
      setSupportText(campaign?.brandSentimentSupportingText);
    }
    setShowEditSupportText(false);
  };

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="brandSentiment"
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
                  Brand Sentiment
                </Grid>
                <Grid
                  item
                  onClick={() => setShowEditSentiment(true)}
                  className={styles.edit}
                >
                  Edit
                </Grid>
                <Grid
                  item
                  onClick={() => setShowEditSentiment(true)}
                  sx={{ marginTop: '2px' }}
                >
                  <img className={styles.pen} src="/images/pen.jpg" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: '-7px' }}>
              <Switch {...label} checked={s3Info?.visibleToBrand} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.span}>
          Sentiment breakdown of the audience towards your brand during
          different stages of the campaign
        </Grid>
        <Grid item sx={{ marginLeft: '-12px' }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item className={styles.pieChart}>
              {preCampaignInfo && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={preCampaignInfo}
                />
              )}
            </Grid>
            <Grid item className={styles.pieChart}>
              {duringCampaignInfo && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={duringCampaignInfo}
                />
              )}
            </Grid>
            <Grid item className={styles.pieChart}>
              {postCampaignInfo && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={postCampaignInfo}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.legend}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item sx={{ marginRight: '16px' }}>
              <span className={styles.legend_span} style={{ color: '#9999A7' }}>
                Legend:
              </span>
            </Grid>
            <Grid item>
              <div
                className={styles.square}
                style={{ background: '#98DF8A' }}
              />
              <span className={clsx(styles.legend_span, styles.label)}>
                Positive
              </span>
            </Grid>
            <Grid item>
              <div
                className={styles.square}
                style={{ background: '#FAF1A2' }}
              />
              <span className={clsx(styles.legend_span, styles.label)}>
                Neutral
              </span>
            </Grid>
            <Grid item>
              <div
                className={styles.square}
                style={{ background: '#F99999' }}
              />
              <span className={clsx(styles.legend_span, styles.label)}>
                Negative
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {!showEditSupportText ? (
            <div>
              {supportText === '' ? (
                <Grid
                  className={styles.add_key}
                  onClick={() => setShowEditSupportText(true)}
                >
                  + Add supporting text
                </Grid>
              ) : (
                <>
                  <Grid item className={styles.font}>
                    {supportText}
                  </Grid>
                  <Grid
                    item
                    onClick={() => setShowEditSupportText(true)}
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
                    value={supportText}
                    onChange={(e) => setSupportText(e.target.value)}
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
                        onClick={saveSupportText}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelSupportText}
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
      {showEditSentiment && (
        <SentimentModal
          handleClose={() => setShowEditSentiment(false)}
          open
          sentiments={sentimentArray}
        />
      )}
    </Grid>
  );
};

export default BrandSentiment;
