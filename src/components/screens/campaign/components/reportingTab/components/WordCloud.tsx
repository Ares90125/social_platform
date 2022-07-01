/* eslint-disable guard-for-in */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HC_WordCloud from 'highcharts/modules/wordcloud';
import { useQuery } from 'react-query';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import {
  CmcReportWc,
  getCMCReportWc,
} from '../../../../../../graphs/getCMCReportWc';

type WordCloudProp = {
  campaign?: CampaignInputs;
  updateSupportText: Function;
  s3Info?: IWordCloudSection | null;
  toggleChecked: Function;
};

export interface WordCloudData {
  name: string;
  weight: number;
  color: string;
}

export interface IWordCloudSection {
  content: {
    preCampaign: { [key: string]: number };
    duringCampaign: { [key: string]: number };
  };
  visibleToBrand?: boolean;
  supportingText?: string;
  preCamapingVisibleToBrand: boolean;
  duringCamapingVisibleToBrand: boolean;
}

const chartOption = {
  tooltip: {
    enabled: false,
  },
  chart: {
    backgroundColor: 'transparent',
    width: 250,
    height: 250,
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  legend: {
    shadow: false,
    enabled: false,
  },
  series: [],
};

const WordCloud: React.FC<WordCloudProp> = ({
  campaign,
  updateSupportText,
  s3Info,
  // toggleChecked,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  if (typeof Highcharts === 'object') {
    HC_WordCloud(Highcharts);
  }
  const [wordCloudData, setWordCloudData] = useState<IWordCloudSection | null>(
    null,
  );
  const [preCampaignOption, setPreCampaignOption] = useState<any>();
  const [duringCampaignOption, setDuringCampaignOption] = useState<any>();

  const [word, setWord] = useState(true);
  const [wordSpan, setWordSpan] = useState(
    'Top keywords that were trending before and during the campaign',
  );
  const [wordSpanCancel, setWordSpanCancel] = useState('');
  const [wordCloud, setWordCould] = useState(true);
  const [wordText, setWordText] = useState('');
  const [wordTextCancel, setWordTextCancel] = useState('');

  const { refetch: fetchReportWc } = useQuery(
    'getCMCReportWc',
    () => getCMCReportWc(campaign?.campaignId!),
    {},
  );

  const fetchWc = async () => {
    let { data: reportWc } = await fetchReportWc();
    if (!reportWc) {
      reportWc = {
        beforeWC: '{}',
        duringWC: '{}',
        campaignId: campaign?.campaignId,
        createdAtUTC: null,
        updatedAtUTC: null,
      } as CmcReportWc;
    }
    const { duringCampaign, preCampaign } = createWordCloudDataModel(reportWc);
    const obj: IWordCloudSection = {
      supportingText: campaign?.wordCloudSupportingText!,
      visibleToBrand: true,
      content: { preCampaign, duringCampaign },
      preCamapingVisibleToBrand: true,
      duringCamapingVisibleToBrand: true,
    };

    updateChartOptions(preCampaign, duringCampaign);

    setWordCloudData(obj);
    console.log(wordCloudData);
  };

  useEffect(() => {
    if (campaign) {
      fetchWc();
    }
  }, [campaign]);

  const sortJSONKeysByValue = (object) => {
    if (!object) {
      return null;
    }

    const sortable = [];
    const sortedObject = {};

    // @ts-ignore
    Object.keys(object).forEach((key) => sortable.push([key, object[key]]));
    sortable
      .sort((a, b) => b[1] - a[1])
      ?.slice(0, 50)
      .forEach((ele) => (sortedObject[ele[0]] = ele[1]));

    return sortedObject;
  };

  const updateChartOptions = (preCampaign, duringCampaign) => {
    const preCampaignList: WordCloudData[] = [];
    for (const key in preCampaign) {
      preCampaignList.push({
        name: key,
        weight: preCampaign[key],
        color: '#B6B6B6',
      });
    }
    const duringCampaignList: WordCloudData[] = [];
    for (const key in duringCampaign) {
      duringCampaignList.push({
        name: key,
        weight: preCampaign[key],
        color: '#1F77B4',
      });
    }

    setPreCampaignOption({
      ...chartOption,
      series: [
        {
          minFontSize: 45,
          maxFontSize: 90,
          type: 'wordcloud',
          spiral: 'archimedean',
          data: preCampaignList,
          name: '',
        },
      ],
    });
    setDuringCampaignOption({
      ...chartOption,
      series: [
        {
          minFontSize: 45,
          maxFontSize: 90,
          type: 'wordcloud',
          spiral: 'archimedean',
          data: duringCampaignList,
          name: '',
        },
      ],
    });
  };

  const createWordCloudDataModel = (reportWc: CmcReportWc) => {
    let preCampaign: any = {};
    let duringCampaign: any = {};
    if (reportWc.beforeWC) {
      preCampaign = JSON.parse(reportWc.beforeWC);
      preCampaign = sortJSONKeysByValue(preCampaign);
    }
    if (reportWc.duringWC) {
      duringCampaign = JSON.parse(reportWc.duringWC);
      duringCampaign = sortJSONKeysByValue(duringCampaign);
    }
    return { duringCampaign, preCampaign };
  };

  const addWordSpan = () => {
    setWord(false);
  };
  const changeWord = (e) => {
    setWordSpanCancel(e.target.value);
  };
  const saveWordSpan = () => {
    setWordSpan(wordSpanCancel);
    setWord(true);
  };
  const cancelWordSpan = () => {
    setWord(true);
  };
  const changeWordText = (e) => {
    setWordTextCancel(e.target.value);
  };
  const addWordCloud = () => {
    setWordCould(false);
  };
  const saveWordCloud = () => {
    setWordText(wordTextCancel);
    setWordCould(true);
    updateSupportText(wordTextCancel);
  };
  const cancelWordCloud = () => {
    setWordCould(true);
  };

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="wordCloud"
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
                  Word Cloud
                </Grid>
                <Grid item onClick={addWordSpan} className={styles.edit}>
                  Edit
                </Grid>
                <Grid item onClick={addWordSpan} sx={{ marginTop: '2px' }}>
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
          {word ? (
            <Grid item className={styles.span}>
              {wordSpan === '' ? (
                <Grid className={styles.add} onClick={addWordSpan}>
                  + Add supporting text
                </Grid>
              ) : (
                wordSpan
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
                  <textarea onChange={changeWord} className={styles.textarea} />
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
                        onClick={saveWordSpan}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelWordSpan}
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
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid
              item
              className={styles.word_card}
              sx={{ marginRight: '24px' }}
            >
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sx={{ width: '366px' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item>Pre-Campaign</Grid>
                    <Grid item>
                      <Switch
                        {...label}
                        checked={s3Info?.preCamapingVisibleToBrand}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ marginTop: '24px' }}>
                  {preCampaignOption && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={preCampaignOption}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.word_card}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sx={{ width: '366px' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item>During Campaign</Grid>
                    <Grid item>
                      <Switch
                        {...label}
                        checked={s3Info?.duringCamapingVisibleToBrand}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ marginTop: '24px' }}>
                  {duringCampaignOption && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={duringCampaignOption}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {wordCloud ? (
            <div>
              {wordText === '' ? (
                <Grid className={styles.add_key} onClick={addWordCloud}>
                  + Add supporting text
                </Grid>
              ) : (
                <>
                  <Grid item className={styles.font}>
                    {wordText}
                  </Grid>
                  <Grid
                    item
                    onClick={addWordCloud}
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
                    value={wordTextCancel}
                    onChange={changeWordText}
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
                        onClick={saveWordCloud}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelWordCloud}
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

export default WordCloud;
