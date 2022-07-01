import moment from 'moment-timezone';
import { CampaignStatusEnum } from '../../../../../utils/enums/campaignStatus';

export const cmcTypeList = [
  'User Generated Content (UGC)',
  'Lead Generation',
  'Survey',
  'Sampling',
];

export const kpiList = [
  'CRM Leads',
  'User Generated Content',
  'Brand Mentions',
  'Increase brand share of voice',
  'Increase positive sentiment',
  'Decrease negative sentiment',
  'Increase category conversations',
  'Hashtag Mentions',
];

export const postTypes = [
  'Text',
  'Live video',
  'Multi Video',
  'Video + Images',
];

export const postTypesDetails = [
  'Basic',
  'Live video',
  'Multi Video',
  'Video + Images',
];

export const postTypesDetailsData = {
  Basic: 'Basic',
  'Live video': 'LiveVideo',
  'Multi Video': 'MultiVideo',
  'Video + Images': 'VideoImage',
};

export const communicationChannels = ['WhatsApp', 'Email'];
export const currencies = ['INR', 'USD', 'SGD'];

export const timeZones = moment.tz
  .names()
  .map((timezone) => `(UTC ${moment.tz(timezone).format('Z')}) ${timezone}`);

const tz = moment.tz.guess();
const convertedTz = tz ? `(UTC ${moment.tz(tz).format('Z')}) ${tz}` : '';

export const defaultValues = {
  campaignName: '',
  details: '',
  phaseIdea: '',
  typeformId: '',
  cmcType: [],
  totalPhase: '',
  currentPhase: null,
  productPurchaseInfo: '',
  trainingLinkMessage: '',
  assetsTextRequired: false,
  assetsVideoRequired: false,
  assetsImagesRequired: '',
  keywordCategory: '',
  keywordSubCategories: [],
  keywordBrand: '',
  primaryObjective: '',
  secondaryObjective: '',
  KPIs: [],
  taskTitle: '',
  campaignPeriod: '',
  defaultPostContentType: null,
  timezoneName: convertedTz,
  communicationChannel: null,
  currency: '',
  defaultTaskDate: null,
  startDateAtUTC: '',
  endDateAtUTC: '',
  brandId: '',
  brandLogoURL: '',
  brandName: '',
  cmcReportVersion: 2,
  productPurchaseRequired: false,
  proposalEmails: [],
  status: CampaignStatusEnum.Draft,
  keywords: [],
  engagementInsights: [
    'intent|Purchase Intent:_get_,_Buy_,Bought,Price,Cost,_pp_,discount,sale,amazon,_shop_,purchase,khareed,kharid,will%try,want%try,will%use,want%use',
    'intent|Recommendations:_try_,Reco,Recco,suggest,go for it,must%buy,should%buy',
    'intent|Usage:using,used,tried,_got_,apply,applied,istemal,_laga_,_lagaa_',
    'emotions|Positive Emotion:_Great_,awesome,love,fantastic,excellent,excelent,good,_gud_,_super_,superb,accha,amazing,badhiya,badiya,favorite,favourite,favorit,favourit,favrit,_best_',
  ],
};
