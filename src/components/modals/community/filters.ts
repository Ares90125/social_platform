import { CommunityDiscoveryInput } from '../../../graphs/communityDiscoveryAPI';

const businessCategory = [
  'Parenting',
  'Lifestyle, Beauty & Makeup',
  'Fitness & Health',
  'Cooking & Recipes',
  'Food & Drink',
  'Medical & Mental Health',
  'Learning & Education',
  'Neighborhood/Local Groups',
  'Business-Brand',
  'Hobbies & Interests',
  'Jobs & Careers',
  'Travel',
  'Sports & Gaming',
  'Humor',
  'Arts',
  'Vehicles & Commutes',
  'Animals',
  'Entertainment',
  'Others',
  'Buy & Sell',
  'Relationships & Identity',
  'Faith & Spirituality',
  'Politics',
];

export const initialFilterValues: CommunityDiscoveryInput = {
  descendingOrder: true,
  groupQualification: 'FrequentlyMonetized',
  sortBy: 'campaignPostEngagementRateLastNinetyDays',
};

export const targetAudienceFilters = [
  {
    id: 1,
    label: 'Gender Criteria',
    inputName: 'gender',
    data: [
      { value: 'Men', displayName: 'Men' },
      { value: 'Women', displayName: 'Women' },
      { value: 'Others', displayName: 'Others' },
    ],
  },
  {
    id: 2,
    label: 'Age Criteria',
    inputName: 'ageRange',
    data: [
      { value: '13-17', displayName: '13-17' },
      { value: '18-24', displayName: '18-24' },
      { value: '25-34', displayName: '25-34' },
      { value: '35-44', displayName: '35-44' },
      { value: '45-54', displayName: '45-54' },
      { value: '55-64', displayName: '55-64' },
      { value: '65+', displayName: '65+' },
    ],
  },
];

export const membersMatchingCriteria = {
  label: 'Members Matching Criteria',
  inputName: 'memberMatchingCriteria',
  data: [
    { value: 'Percentage', displayName: 'Percentage' },
    { value: 'AbsoluteValue', displayName: 'Absolute Value' },
  ],
};

export const communityFilters: {
  [key: string]: {
    withSearch: boolean;
    data: string[];
    filterName: keyof CommunityDiscoveryInput;
  };
} = {
  'Business Category': {
    withSearch: true,
    data: businessCategory,
    filterName: 'businessCategory',
  },
  'Group location (country)': {
    withSearch: true,
    data: [],
    filterName: 'country',
  },
  'Monetizable vs Non-monetizable': {
    withSearch: false,
    data: ['Monetizable', 'NonMonetizable'],
    filterName: 'monetizationState',
  },
  'Group state': {
    withSearch: false,
    data: ['Installed', 'NotInstalled', 'Uninstalled'],
    filterName: 'state',
  },
  // Contactable: ['by WhatsApp', 'by App', 'by Community Team', 'by Email', 'Not contactable'],
  'Group type': {
    withSearch: false,
    data: ['CLOSED', 'OPEN', 'SECRET'],
    filterName: 'privacy',
  },
  'BD or Non-BD': {
    withSearch: false,
    data: ['BD', 'NonBD'],
    filterName: 'owner',
  },
  Region: {
    withSearch: false,
    data: ['Central', 'East', 'North', 'South', 'West'],
    filterName: 'region',
  },
};

export const restCheckboxFilters = [
  {
    label: 'Trainings',
    data: [
      {
        displayName: 'CMC Trained',
        filterName: 'cmcTrained',
        value: false,
      },
      {
        displayName: 'Performance Trained',
        filterName: 'performanceTrained',
        value: false,
      },
    ],
  },
  {
    label: 'GroupProfle',
    data: [
      {
        displayName: 'Group Profile required',
        filterName: 'groupProfile',
        value: false,
      },
    ],
  },
];

export const restRadioFilters = [
  {
    label: 'CMC Min Average Rating',
    filterName: 'minRating',
    data: [
      {
        displayName: 'Disable min rating filter',
        value: 0,
      },
      {
        displayName: 'Show groups with rating 1+',
        value: 1,
      },
      {
        displayName: 'Show groups with rating 2+',
        value: 2,
      },
      {
        displayName: 'Show groups with rating 3+',
        value: 3,
      },
      {
        displayName: 'Show groups with rating 4+',
        value: 4,
      },
    ],
  },
  {
    label: 'CMC Max Average Rating',
    filterName: 'maxRating',
    data: [
      {
        displayName: 'Disable max rating filter',
        value: 0,
      },
      {
        displayName: 'Show groups with rating 4-',
        value: 4,
      },
      {
        displayName: 'Show groups with rating 3-',
        value: 3,
      },
      {
        displayName: 'Show groups with rating 2-',
        value: 2,
      },
      {
        displayName: 'Show groups with rating 1-',
        value: 1,
      },
    ],
  },
];
