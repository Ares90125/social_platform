/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CMCReportMetricsV2 } from '../../../../../../graphs/getCMCReportMetricsV2';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { SOVModal } from './modals/SOVModal';

const colors = [
  '#1F77B4',
  '#B23333',
  '#9467BD',
  '#17BECF',
  '#BCBD22',
  '#8C564B',
  '#FF7F0E',
  '#C5B0D5',
  '#E377C2',
  '#98DF8A',
  '#FFBB78',
  '#F7B6D2',
  '#DBDB8D',
  '#9EDAE5',
];

type GraphDataType = {
  color: string;
  name: string;
  data: Array<number>;
};

export interface BrandShareofVoiceDetails extends CategoriesSelectionChange {
  content: StackedBarGraphConent;
  supportingText?: string;
  visibleToBrand?: boolean;
  afterSOV: boolean;
  beforeSOV: boolean;
  duringSOV: boolean;
  nonHashTag: boolean;
  referenceConversation: ReferenceConversations;
}

export type Categories = Partial<Record<CategoryKeys, number>>;

export interface StackedBarGraphConent {
  afterSOV: {};
  beforeSOV: {};
  duringSOV: {};
  nonHashTag: {};
}

export type CategoryKeys = keyof StackedBarGraphConent;
export type CategoriesSelectionChange = Partial<Record<CategoryKeys, boolean>>;
export type ReferenceConversations = Partial<
  Record<CategoryKeys, { [brandName: string]: boolean }>
>;
const campaginCategories = [
  'Pre-Campaign',
  'During Campaign',
  'Post-Campaign',
  'Non-Hastag',
] as const;
export type CategoryNames = typeof campaginCategories[number];

const BrandShareOpt = {
  chart: {
    type: 'bar',
  },
  title: {
    text: null,
  },
  xAxis: {
    gridLineWidth: 0,
    categories: [
      'Pre-Campaign',
      'During Campaign',
      'Post-Campaign',
      'Non-Hashtag',
    ],
    labels: {
      useHTML: true,
      style: {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#9999A7',
      },
      formatter() {
        // @ts-ignore
        return this.value;
      },
    },
    style: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      color: '#9999A7',
    },
  },
  yAxis: {
    lineWidth: 1,
    min: 0,
    gridLineWidth: 0,
    tickPositions: [0, 25, 50, 75, 100],
    title: {
      text: 'Percentage',
    },
    labels: {
      formatter() {
        // @ts-ignore
        return `${this.value}%`;
      },
    },
  },
  // plotOptions: {
  //   series: {
  //     stacking: 'normal',
  //     point: {
  //       events: {
  //         click: (e) => {console.log(this); console.log(e.point.category); console.log(e.point.y);  }
  //       }
  //     }
  //   },
  //   bar: {
  //     dataLabels: {
  //       enabled: true,
  //       allowOverlap: true,
  //     },
  //   },
  // },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 0,
    className: 'highcharts-no-tooltip',
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
    maxHeight: 350,
    backgroundColor: '#F4F6F8',
    borderColor: '#D6D6DC',
    borderWidth: 1,
    padding: 20,
    width: '212px',
    itemMarginTop: 10,
    itemMarginBottom: 10,
    overflowY: 'auto',
    navigation: {
      enabled: false,
    },
    itemStyle: {
      lineHeight: '16px',
      color: '#33334F',
      fontWeight: '400',
      fontSize: '14px',
    },
    symbolHeight: 14,
    symbolWidth: 14,
    symbolRadius: 2,
    labelFormatter() {
      // @ts-ignore
      return `<span>${this.name}</span>`;
    },
  },
};

type SOVProp = {
  toggleSlider:Function,
  campaign?: CampaignInputs;
  campaignS3Info?: CMCReportMetricsV2;
  updateSupportText: Function;
  s3Info?: BrandShareofVoiceDetails | null;
};

const BrandSOV: React.FC<SOVProp> = ({
  campaign,
  toggleSlider,
  campaignS3Info,
  updateSupportText,
  s3Info,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }

  const [graphData, setGraphData] = useState<Array<GraphDataType>>([]);
  const [graphOption, setGraphOption] = useState<any>(null);

  const [supportText, setSupportText] = useState('');
  const [showEditSOV, setShowEditSOV] = useState(false);
  const [showEditSupportText, setShowEditSupportText] = useState(false);

  useEffect(() => {
    if (campaignS3Info) {
      const brandArray: Array<string> = [];
      const preCampaign = campaignS3Info.beforeSOV
        ? JSON.parse(campaignS3Info.beforeSOV)
        : {};
      const duringCampaign = campaignS3Info.duringSOV
        ? JSON.parse(campaignS3Info.duringSOV)
        : {};
      const postCampaign = campaignS3Info.afterSOV
        ? JSON.parse(campaignS3Info.afterSOV)
        : {};
      const hashTags = campaignS3Info.duringSOVNonHashTag
        ? JSON.parse(campaignS3Info.duringSOVNonHashTag)
        : {};

      Object.keys(preCampaign).map((key) => {
        if (!brandArray.includes(key)) {
          brandArray.push(key);
        }
      });
      Object.keys(duringCampaign).map((key) => {
        if (!brandArray.includes(key)) {
          brandArray.push(key);
        }
      });
      Object.keys(postCampaign).map((key) => {
        if (!brandArray.includes(key)) {
          brandArray.push(key);
        }
      });
      Object.keys(hashTags).map((key) => {
        if (!brandArray.includes(key)) {
          brandArray.push(key);
        }
      });

      let preCampaignTotal = 0;
      let duringCampaignTotal = 0;
      let postCampaignTotal = 0;
      let hashTagTotal = 0;
      for (let i = 0; i < brandArray.length; i++) {
        preCampaignTotal += preCampaign[brandArray[i]]
          ? preCampaign[brandArray[i]]
          : 0;
        duringCampaignTotal += duringCampaign[brandArray[i]]
          ? duringCampaign[brandArray[i]]
          : 0;
        postCampaignTotal += postCampaign[brandArray[i]]
          ? postCampaign[brandArray[i]]
          : 0;
        hashTagTotal += hashTags[brandArray[i]] ? hashTags[brandArray[i]] : 0;
      }

      for (let i = 0; i < brandArray.length; i++) {
        preCampaign[brandArray[i]] =
          preCampaignTotal > 0
            ? parseFloat(
                ((preCampaign[brandArray[i]] / preCampaignTotal) * 100).toFixed(
                  2,
                ),
              )
            : 0;
        duringCampaign[brandArray[i]] =
          duringCampaignTotal > 0
            ? parseFloat(
                (
                  (duringCampaign[brandArray[i]] / duringCampaignTotal) *
                  100
                ).toFixed(2),
              )
            : 0;
        postCampaign[brandArray[i]] =
          postCampaignTotal > 0
            ? parseFloat(
                (
                  (postCampaign[brandArray[i]] / postCampaignTotal) *
                  100
                ).toFixed(2),
              )
            : 0;
        hashTags[brandArray[i]] =
          hashTagTotal > 0
            ? parseFloat(
                ((hashTags[brandArray[i]] / hashTagTotal) * 100).toFixed(2),
              )
            : 0;
      }

      setGraphInfo(
        brandArray,
        preCampaign,
        duringCampaign,
        postCampaign,
        hashTags,
      );
    }
  }, [campaignS3Info]);

  const setGraphInfo = (
    brandArray,
    preCampaign,
    duringCampaign,
    postCampaign,
    hashTags,
  ) => {
    const result: Array<GraphDataType> = [];
    for (let i = 0; i < brandArray.length; i++) {
      result.push({
        name: brandArray[i],
        color: colors[i % 8],
        data: [
          preCampaign[brandArray[i]] === 0 ? null : preCampaign[brandArray[i]],
          duringCampaign[brandArray[i]] === 0 ? null : duringCampaign[brandArray[i]],
          postCampaign[brandArray[i]] === 0 ? null : postCampaign[brandArray[i]],
          hashTags[brandArray[i]] === 0 ? null : hashTags[brandArray[i]],
        ],
      });
    }
    setGraphData(result);
    setGraphOption({
      ...BrandShareOpt,
      plotOptions: {
        series: {
          stacking: 'normal',
          point: {
            events: {
              click: (e) => {toggleSlider(true,{"title":"Brand Share of Voice","category":e.point.category,"percent":e.point.y,"name":e.point.series.name});}
            }
          }
        },
        bar: {
          dataLabels: {
            enabled: true,
            allowOverlap: true,
          },
        },
      },
      series: result,
    });
  };

  useEffect(() => {
    if (campaign && campaign.brandShareOfVoiceSupportingText) {
      setSupportText(campaign.brandShareOfVoiceSupportingText);
    }
  }, [campaign]);

  const saveSupportText = () => {
    setShowEditSupportText(false);
    updateSupportText(supportText);
  };

  const cancelSupportText = () => {
    if (campaign && campaign.brandShareOfVoiceSupportingText) {
      setSupportText(campaign.brandShareOfVoiceSupportingText);
    }
    setShowEditSupportText(false);
  };

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="brandSOV"
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
                  Brand Share of Voice
                </Grid>
                <Grid
                  item
                  onClick={() => setShowEditSOV(true)}
                  className={styles.edit}
                >
                  Edit
                </Grid>
                <Grid
                  item
                  onClick={() => setShowEditSOV(true)}
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
          The overall share of your brand mentions in comparison to other brands
          in audience conversations
        </Grid>
        <Grid item sx={{ width: '806px', marginLeft: '-12px' }}>
          {graphOption && (
            <HighchartsReact highcharts={Highcharts} options={graphOption} />
          )}
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
      {showEditSOV && (
        <SOVModal
          handleClose={() => setShowEditSOV(false)}
          brands={graphData}
          open
        />
      )}
    </Grid>
  );
};

export default BrandSOV;
