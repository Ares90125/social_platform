/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useMutation, useQuery } from 'react-query';
import * as _ from 'lodash';
import PublishTopBar from './components/PublishTopBar';
import ReportingSidebar from './components/ReportingSidebar';
import CampaignOverview from './components/CampaignOverview';
import WordCloud from './components/WordCloud';
// import AllPosts from './components/AllPosts';
import styles from '../../../../../assests/scss/campaign.module.scss';
import PhaseIdea from './components/PhaseIdea';
import KeyFindings from './components/KeyFindings';
import KPIResult from './components/KPIResult';
import BrandSOV from './components/BrandSOV';
import BrandSentiment from './components/BrandSentiment';
import EngagementInsights from './components/EngagementInsights';
import CustomConversation from './components/CustomConversation';
import Participation from './components/Participation';
import { CampaignGroupAndTaskDetails } from '../../../../../graphs/listCampaignGroupsAndTasksDetails';
import {
  CampaignInputs,
  CMCReportv3S3Data,
  UpdateCampaignInput,
} from '../detailsTab/campaign.types';
import { getCMCReportMetricsV2 } from '../../../../../graphs/getCMCReportMetricsV2';
import Screenshots from './components/Screenshots';
import { updateCampaign } from '../../../../../graphs/updateCMCampaignDetails';
import { fetchFromS3, uploadToS3 } from '../../../../../utils/helpers/s3';
import ReportingDrawer from './components/ReportingDrawer';

type ReportingTabProps = {
  campaign?: CampaignInputs;
};

const ReportingTab: React.FC<ReportingTabProps> = ({ campaign }) => {
  const [localCampaign, setLocalCampaign] = useState<CampaignInputs | null>(
    null,
  );
  const [liveS3Info, setLiveS3Info] = useState<CMCReportv3S3Data | null>(null);
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [isLogoRemoved, setLogoRemoved] = useState(false);
  const { data: campaignS3Info } = useQuery(
    'getCMCReportMetricsV2',
    () => getCMCReportMetricsV2(campaign?.campaignId!),
    {},
  );
  const [open,setOpen]=useState(false);
  const [drawer_val,setDrawer]=useState<any|null>(null);
  const updateCampaignMutation = useMutation(updateCampaign);

  const getCampaignReportDataOnLoad = (campaignReport) => {
    let campaignReportData = {};

    try {
      campaignReportData = JSON.parse(decodeURIComponent(campaignReport));
    } catch (e) {
      try {
        campaignReportData = JSON.parse(
          decodeURIComponent(JSON.parse(campaignReport)),
        ) as CMCReportv3S3Data;
      } catch (error) {
        console.log('parse error', error);
      }
    }
    if (!_.isEmpty(campaignReportData)) {
      const campaignReportS3Data = _.cloneDeep(
        campaignReportData,
      ) as CMCReportv3S3Data;

      console.log('campaign report s3 data', campaignReportS3Data);
      console.log('campaign data from db', campaign);
      console.log('campaign v3 database', campaignS3Info);
      setLiveS3Info(campaignReportS3Data);

      // setResultDetailsOnS3Data(reportMetrics, campaignReportS3Data);
      // const afterSOV = campaignReportData['afterSOV'];
      // const beforeSOV = campaignReportData['beforeSOV'];
      // conduringSOV = campaignReportData['duringSOV'];
      // campaignPosts = campaignReportData['campaignPosts'];
      // participantGroupsDetails = campaignReportData['participantGroupsDetails'];
      // visibleCampaignReport = campaignReportData['visibleCampaignReport'];
      // participantGroupsDetails = participantGroupsDetails?.filter(group => group.groupName);
      // participantGroupsDetails = participantGroupsDetails?.splice(0, 15);

      // campaignPosts = campaignPosts.filter(post => !post.isHidden);

      // end = campaignPosts.length > limit ? limit : campaignPosts.length;
      // isConversationsLoaded = true;
    }
  };

  const fetchDataFromS3 = () => {
    if (campaign && campaign.s3ReportUrl) {
      fetchFromS3(campaign.s3ReportUrl).then((data) => {
        let campaignReportData;
        if (data) {
          try {
            // @ts-ignore
            campaignReportData = new TextDecoder('utf-8').decode(data.Body!);
            getCampaignReportDataOnLoad(campaignReportData);
          } catch (e) {
            const reader = new FileReader();

            reader.addEventListener('loadend', () => {
              getCampaignReportDataOnLoad(reader.result);
            });

            // @ts-ignore
            campaignReportData = reader.readAsText(data.Body!);
          }
        }
      });
    }
  };
  useEffect(() => {
    fetchDataFromS3();
    if (campaign) {
      setLocalCampaign(campaign);
    }
  }, [campaign]);

  const updateSupportText = (key, content) => {
    setLocalCampaign({ ...localCampaign!, [`${key}SupportingText`]: content });
    handleUpdateCampaign(`${key}SupportingText`, content, true);
  };

  const updateVisible = (key, value) => {
    console.log(key, value);
    // setLiveS3Info({ ...liveS3Info, [key]: { visibleToBrand: value }});
  };

  const updateContentText = (key, content) => {
    setLocalCampaign({ ...localCampaign!, [key]: content });
    handleUpdateCampaign(key, content, true);
  };

  const updateImageFile = (file) => {
    setPreviewImg(file);
  };

  const processFilesForUrls = async (file) =>
    Promise.all([uploadToS3(file, 'image', uuid())]);

  const handleUpdateCampaign = async (
    key = 'key',
    content = null,
    checkInstantUpdate = false,
  ) => {
    console.log(localCampaign);
    const campaignUpdateInput = {} as UpdateCampaignInput;
    campaignUpdateInput.brandId = localCampaign!.brandId;
    campaignUpdateInput.brandName = localCampaign!.brandName;
    campaignUpdateInput.campaignId = localCampaign!.campaignId;
    campaignUpdateInput.campaignName = localCampaign!.campaignName;
    campaignUpdateInput.details = localCampaign!.details;
    campaignUpdateInput.startDateAtUTC = localCampaign!.startDateAtUTC;
    campaignUpdateInput.endDateAtUTC = localCampaign!.endDateAtUTC;
    campaignUpdateInput.objective = localCampaign!.brandObjective;
    campaignUpdateInput.keywordCategory = localCampaign!.keywordCategory;
    campaignUpdateInput.keywordBrand = localCampaign!.keywordBrand;
    campaignUpdateInput.keywords = localCampaign!.keywords;
    campaignUpdateInput.campaignSummary = localCampaign!.campaignSummary;
    campaignUpdateInput.proposalEmails = localCampaign!.proposalEmails;
    campaignUpdateInput.cmcReportName = localCampaign!.cmcReportName;
    campaignUpdateInput.taskTitle = localCampaign!.taskTitle;
    campaignUpdateInput.campaignPeriod = localCampaign!.campaignPeriod;
    campaignUpdateInput.status = localCampaign!.status;
    campaignUpdateInput.campaignBriefForCommunityAdmin =
      localCampaign!.campaignBriefForCommunityAdmin;
    campaignUpdateInput.keywordSubCategories =
      localCampaign!.keywordSubCategories;
    // campaignUpdateInput.primaryObjective = localCampaign!.primaryObjective;
    // campaignUpdateInput.secondaryObjective = localCampaign!.secondaryObjective;
    // campaignUpdateInput.defaultTaskDate = localCampaign!.defaultTaskDate;
    campaignUpdateInput.timezoneName = localCampaign!.timezoneName;
    campaignUpdateInput.s3ReportUrl = localCampaign!.s3ReportUrl;
    campaignUpdateInput.phaseIdea = localCampaign!.phaseIdea;
    campaignUpdateInput.totalPhase = localCampaign!.totalPhase;
    campaignUpdateInput.currentPhase = localCampaign!.currentPhase;
    campaignUpdateInput.currency = localCampaign!.currency;
    campaignUpdateInput.communicationChannel =
      localCampaign!.communicationChannel;
    campaignUpdateInput.keyFindings = localCampaign!.keyFindings;
    campaignUpdateInput.keyFindingsSupportingText =
      localCampaign!.keyFindingsSupportingText;
    campaignUpdateInput.brandObjective = localCampaign!.brandObjective;
    campaignUpdateInput.resultsSupportingText =
      localCampaign!.resultsSupportingText;
    campaignUpdateInput.kpiSupportingText = localCampaign!.kpiSupportingText;
    campaignUpdateInput.brandShareOfVoiceSupportingText =
      localCampaign!.brandShareOfVoiceSupportingText;
    campaignUpdateInput.brandSentimentSupportingText =
      localCampaign!.brandSentimentSupportingText;
    campaignUpdateInput.wordCloudSupportingText =
      localCampaign!.wordCloudSupportingText;
    campaignUpdateInput.engagementInsightSupportingText =
      localCampaign!.engagementInsightSupportingText;
    campaignUpdateInput.topPerformingPostSupportingText =
      localCampaign!.topPerformingPostSupportingText;

    const processedFileURLs = previewImg
      ? await Promise.all([processFilesForUrls(previewImg)])
      : null;
    if (isLogoRemoved) {
      campaignUpdateInput.s3CoverImageUrl = null;
    } else {
      campaignUpdateInput.s3CoverImageUrl = processedFileURLs
        ? processedFileURLs[0][0] || ''
        : localCampaign!.s3CoverImageUrl;
    }

    if (checkInstantUpdate) {
      campaignUpdateInput[key] = content;
    }

    try {
      updateCampaignMutation
        .mutateAsync(campaignUpdateInput)
        .then((result) => {
          if (result) {
            setLocalCampaign(result);
          }
        })
        .catch((error) => {
          console.log('error result', error);
        });

      return true;
    } catch (e) {
      return false;
    }
  };
  const onScroll = (id) => {
    window.scroll({
      top: document.getElementById(id)!.offsetTop - 130,
      behavior: 'smooth',
    });
  };
  return (
    <div className={styles.publish_tab_container}>
      {!open?<></>:
      <ReportingDrawer
        value={drawer_val}
        handleClick={()=>{setOpen(false);}}
        open={open}/>
      }
      <PublishTopBar />
      <div className="container">
        <div className={styles.publish_tab_wrap}>
          <ReportingSidebar
            handleClick={(id) => onScroll(id)}
            campaignReportS3Data={liveS3Info}
          />
          <div className={styles.data_content_wrap}>
            <CampaignOverview
              campaign={campaign}
              campaignS3Info={campaignS3Info}
              handleUpdateContent={(content) =>
                updateContentText('brandObjective', content)}
              handleUpdatePreviewImage={(imgFile) => updateImageFile(imgFile)}
            />
            <Grid sx={{ marginTop: '80px' }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.campaign}>
                  Campaign Summary
                </Grid>
                <Grid item className={styles.span}>
                  A deep dive into every metric from different perspectives
                </Grid>
              </Grid>
            </Grid>
            <PhaseIdea
              campaign={campaign}
              handleUpdateContent={(content) =>
                updateContentText('phaseIdea', content)}
              visible={liveS3Info?.phaseIdeaDetails.visibleToBrand}
            />
            <KeyFindings
              content={campaign?.keyFindings!}
              visible={liveS3Info?.keyFindings.visibleToBrand}
              supportText={campaign?.keyFindingsSupportingText!}
              updateSupportText={(text) =>
                updateSupportText('keyFindings', text)}
              handleUpdateContent={(text) =>
                updateContentText('keyFindings', text)}
            />
            <KPIResult
              results={liveS3Info?.results}
              kpiDetails={liveS3Info?.kpiDetails}
              updateKPISupportText={(text) => updateSupportText('kpi', text)}
              updateResultsSupportText={(text) =>
                updateSupportText('results', text)}
            />
            <BrandSOV
              toggleSlider={(flag,value)=>{setDrawer(value);setOpen(flag);}}
              campaign={campaign}
              s3Info={liveS3Info?.brandShareOfVoice}
              campaignS3Info={campaignS3Info}
              updateSupportText={(text) =>
                updateSupportText('brandShareOfVoice', text)}
            />
            <BrandSentiment
              toggleSlider={(flag,value)=>{setDrawer(value);setOpen(flag);}}
              campaign={campaign}
              campaignS3Info={campaignS3Info}
              s3Info={liveS3Info?.brandSentiment}
              updateSupportText={(text) =>
                updateSupportText('brandSentiment', text)}
            />
            <Grid sx={{ marginTop: '80px' }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.campaign}>
                  Engagement Insights
                </Grid>
                <Grid item className={styles.span}>
                  Monitoring the conversations for your campaign
                </Grid>
              </Grid>
            </Grid>
            <EngagementInsights
              toggleSlider={(flag,value)=>{setDrawer(value);setOpen(flag);}}
              campaign={campaign}
              campaignS3Info={campaignS3Info}
              s3Info={liveS3Info?.engagementInsight}
              updateSupportText={(text) =>
                updateSupportText('engagementInsight', text)}
            />
            <WordCloud
              campaign={campaign}
              s3Info={liveS3Info?.wordCloud}
              toggleChecked={(value) => updateVisible('wordCloud', value)}
              updateSupportText={(text) =>
                updateSupportText('wordCloud', text)}
            />
            <CustomConversation />
            <Participation />
            <Screenshots
              campaign={campaign}
              s3Info={liveS3Info?.topPerformingPosts}
              toggleChecked={(value) =>
                updateVisible('topPerformingPosts', value)}
              updateSupportText={(text) =>
                updateSupportText('topPerformingPost', text)}
            />
            {/* <AllPosts /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportingTab;
