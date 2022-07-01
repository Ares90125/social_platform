/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { CMCReportMetricsV2 } from '../../../../../../graphs/getCMCReportMetricsV2';
import { EngagementModal } from './modals/EngagementModal';

const colors = [
  '#98DF8A',
  '#A799FF',
  '#E68686',
  '#8CC7FD',
  '#FFBB78',
  '#C5B0D5',
  '#9EDAE5',
  '#F7B6D2',
  '#FAF1A2',
];

export interface IPieChartData {
  name: string;
  y: number;
  color: string;
  showReferenceConversation?: boolean;
}

export interface IBucket extends IPieChartData {
  keywords?: string;
  visibleToBrand: boolean;
}

export interface IEngagementInsightSection {
  content: {
    intent: IBucket[];
    emotions: IBucket[];
    benefits: IBucket[];
  };
  supportingText?: string;
  intentVisibleToBrand?: boolean;
  emotionsVisibleToBrand?: boolean;
  benefitsVisibleToBrand?: boolean;
  referenceConversations: { intent: {}; benefits: {}; emotions: {} };
}

const chartOption = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 250,
  },
  title: {
    text: null,
  },
  verticalAlign: 'bottom',
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'vertical',
    padding: 20,
    title: {
      text: 'Legend:',
      style: {
        color: '#9999A7',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
    reversed: true,
    maxHeight: '100px',
    backgroundColor: '#F4F6F8',
    borderColor: '#D6D6DC',
    borderWidth: 1,
    width: '220px',
    itemMarginTop: 10,
    itemMarginBottom: 10,
		useHTML: true,
    overflowY: 'auto',
    symbolWidth: 14,
    itemStyle: {
      lineHeight: '16px',
      color: '#33334F',
      fontWeight: '400',
      fontSize: '14px',
      display: 'flex',
      width: '160px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelFormatter() {
      // @ts-ignore
      return `<div>${this.name}</div><div>${this.y}%</div>`;
    },
    symbolHeight: 14,
    symbolRadius: 2,
  },

 
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      innerSize: '70%',
      showInLegend: true,
      dataLabels: {
        enabled: false,
      },
      data: [
        {
          name: 'Best',
          y: 24,
          color: '#9EDAE5',
        },
        {
          name: 'Love',
          y: 20.8,
          color: '#8CC7FD',
        },
        {
          name: 'Good',
          y: 19.7,
          color: '#F7B6D2',
        },
        // ,{
        //   name: 'Like',
        //   y: 15.2,
        //   color: '#98DF8A'
        // },{
        //   name: 'Amazing',
        //   y: 13.6,
        //   color: '#FFBB78'
        // },
      ],
    },
  ],
};

type GraphDataType = {
  name: string;
  y: number;
  color: string;
};

type InsightsProp = {
  toggleSlider:Function,
  campaign?: CampaignInputs;
  campaignS3Info?: CMCReportMetricsV2;
  updateSupportText: Function;
  s3Info?: IEngagementInsightSection | null;
};

const EngagementInsights: React.FC<InsightsProp> = ({
  toggleSlider,
  campaign,
  campaignS3Info,
  updateSupportText,
  s3Info,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [intentOption, setIntentOption] = useState<any>();
  const [emotionsOption, setEmotionsOption] = useState<any>();
  const [benefitsOption, setBenefitsOption] = useState<any>();
  const [supportText, setSupportText] = useState('');
  const [editSupportText, setEditSupportText] = useState(false);
  const [editInsights, setEditInsights] = useState(false);

  useEffect(() => {
    if (campaignS3Info && campaignS3Info.engagementInsights) {
      const json = JSON.parse(campaignS3Info.engagementInsights);
      Object.keys(json).map((key) => {
        if (key.toLowerCase() === 'intent') {
          const intent: Array<GraphDataType> = [];
          let total = 0;
          Object.keys(json[key]).map((intentKey) => {
            total += json[key][intentKey];
          });
          Object.keys(json[key]).map((intentKey, index) => {
            intent.push({
              name: intentKey,
              y:
                total > 0
                  ? Math.floor((json[key][intentKey] / total) * 100)
                  : 0,
              color: colors[index],
            });
          });

          setIntentOption({
            ...chartOption,
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                size: 200,
                dataLabels: {
                  enabled: false,
                },
                point: {
                  events: {
                    click: (e) => {toggleSlider(true,{"title":"Engagement Insights","category":"Intent","percent":e.point.y,"name":e.point.options.name}); }
                  }
                }
              },
            },
            series: [
              {
                name: 'Brands',
                colorByPoint: true,
                innerSize: '70%',
                data: intent,
              },
            ],
          });
        }
        if (key.toLowerCase() === 'emotions') {
          const emotions: Array<GraphDataType> = [];
          let total = 0;
          Object.keys(json[key]).map((emotionKey) => {
            total += json[key][emotionKey];
          });
          Object.keys(json[key]).map((emotionKey, index) => {
            emotions.push({
              name: emotionKey,
              y:
                total > 0
                  ? Math.floor((json[key][emotionKey] / total) * 100)
                  : 0,
              color: colors[index],
            });
          });
          setEmotionsOption({
            ...chartOption,
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                size: 200,
                dataLabels: {
                  enabled: false,
                },
                point: {
                  events: {
                    click: (e) => {toggleSlider(true,{"title":"Engagement Insights","category":"Emotions","percent":e.point.y,"name":e.point.options.name});}
                  }
                }
              },
            },
            series: [
              {
                name: 'Brands',
                colorByPoint: true,
                innerSize: '70%',
                data: emotions,
              },
            ],
          });
        }
        if (key.toLowerCase() === 'benefits') {
          const benefits: Array<GraphDataType> = [];
          let total = 0;
          Object.keys(json[key]).map((benefitKey) => {
            total += json[key][benefitKey];
          });
          Object.keys(json[key]).map((benefitKey, index) => {
            benefits.push({
              name: benefitKey,
              y:
                total > 0
                  ? Math.floor((json[key][benefitKey] / total) * 100)
                  : 0,
              color: colors[index],
            });
          });
          setBenefitsOption({
            ...chartOption,
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                size: 200,
                dataLabels: {
                  enabled: false,
                },
                point: {
                  events: {
                    click: (e) => {toggleSlider(true,{"title":"Engagement Insights","category":"Benefits","percent":e.point.y,"name":e.point.options.name});}
                  }
                }
              },
            },
            series: [
              {
                name: 'Brands',
                colorByPoint: true,
                innerSize: '70%',
                data: benefits,
              },
            ],
          });
        }
      });
    }
  }, [campaignS3Info]);

  useEffect(() => {
    if (campaign && campaign.engagementInsightSupportingText) {
      setSupportText(campaign.engagementInsightSupportingText);
    }
  }, [campaign]);

  const saveSupportText = () => {
    setEditSupportText(false);
    updateSupportText(supportText);
  };

  const cancelSupportText = () => {
    if (campaign && campaign.engagementInsightSupportingText) {
      setSupportText(campaign.engagementInsightSupportingText);
    }
    setEditSupportText(false);
  };

  return (
    <Grid className={styles.phase_card}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item className={styles.intent} id="intent">
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item sx={{ width: '250px' }}>
              <Grid
                container
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
                      Intent
                    </Grid>
                    <Grid
                      item
                      onClick={() => setEditInsights(true)}
                      className={styles.edit}
                    >
                      Edit
                    </Grid>
                    <Grid
                      item
                      onClick={() => setEditInsights(true)}
                      sx={{ marginTop: '2px' }}
                    >
                      <img className={styles.pen} src="/images/pen.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ marginTop: '-7px' }}>
                  <Switch {...label} checked={s3Info?.intentVisibleToBrand} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.aspan}>
              Intent of the audience about your brand/product during the
              campaign
            </Grid>
            <Grid item>
              {intentOption && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={intentOption}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={styles.intent}
          sx={{ paddingLeft: '23px' }}
          id="emotions"
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item sx={{ width: '250px' }}>
              <Grid
                container
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
                      Emotions
                    </Grid>
                    <Grid
                      item
                      onClick={() => setEditInsights(true)}
                      className={styles.edit}
                    >
                      Edit
                    </Grid>
                    <Grid
                      item
                      onClick={() => setEditInsights(true)}
                      sx={{ marginTop: '2px' }}
                    >
                      <img className={styles.pen} src="/images/pen.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ marginTop: '-7px' }}>
                  <Switch {...label} checked={s3Info?.emotionsVisibleToBrand} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.aspan}>
              Emotions reflected in conversations around your brand during the
              campaign
            </Grid>
            <Grid item>
              {emotionsOption && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={emotionsOption}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.benefits} id="benefits">
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item sx={{ width: '250px' }}>
              <Grid
                container
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
                      Benefits
                    </Grid>
                    <Grid
                      item
                      onClick={() => setEditInsights(true)}
                      className={styles.edit}
                    >
                      Edit
                    </Grid>
                    <Grid
                      item
                      onClick={() => setEditInsights(true)}
                      sx={{ marginTop: '2px' }}
                    >
                      <img className={styles.pen} src="/images/pen.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ marginTop: '-7px' }}>
                  <Switch {...label} checked={s3Info?.benefitsVisibleToBrand} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.aspan}>
              Benefits of your brand/product reflected in conversations during
              the campaign
            </Grid>
            <Grid item>
              {benefitsOption && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={benefitsOption}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {!editSupportText ? (
            <div>
              {supportText === '' ? (
                <Grid
                  className={styles.add_key}
                  onClick={() => setEditSupportText(true)}
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
                    onClick={() => setEditSupportText(true)}
                    className={styles.twoedit}
                    sx={{ marginBottom: '20px' }}
                  >
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
      {editInsights && (
        <EngagementModal
          handleClose={() => setEditInsights(false)}
          open
          insights={[]}
          title="Intent"
        />
      )}
    </Grid>
  );
};

export default EngagementInsights;
