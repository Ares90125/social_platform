export const currencies = {
  SGD: 'S$',
  USD: '$',
  INR: '₹',
};

export const currencySybols = {
  S$: 'SGD',
  $: 'USD',
  '₹': 'INR',
};

export const cohorts = [
  'Cohort 1',
  'Cohort 2',
  'Cohort 3',
  'Cohort 4',
  'Cohort 5',
  'Cohort 6',
];

export const paymentStatusOptions = {
  ReadyForPayment: 'Ready for Payment',
  OnHold: 'On Hold',
  Done: 'Done',
  InProcess: 'In Process',
  NotPayable: 'Not Payable',
};

export const assetsStatusOptions = {
  Initial: 'Initial',
  PendingCommunityAdminAccept: 'Pending community admin accept',
  PendingProductPurchase: 'Pending product purchase',
  PendingCopiesAssets: 'Pending copies assets',
  Done: 'Done',
  ProposalNotSent: 'Proposal not sent',
  PendingBrand: 'Pending brand',
  PendingAdmin: 'Pending admin',
  PendingFbLink: 'Pending fb link',
  PendingComplete: 'Pending complete',
};

export const groupTaskStatusOptions = {
  Empty: 'Empty',
  CampaignBriefSent: 'Campaign Brief Sent',
  CampaignAccepted: 'Campaign Accepted',
  CampaignDeclined: 'Campaign Declined',
  ContentApproved: 'Content Approved',
  TaskCreated: 'Task Created',
  TaskRequestSent: 'Task Request Sent',
  TaskScheduled: 'Task Scheduled',
  TaskDeclined: 'Task Declined',
  TaskCompleted: 'Task Completed',
  TaskPaused: 'Task Paused',
  TaskFailed: 'Task Failed',
  PaymentSent: 'Payment Sent',
};

export const ownerOptions = {
  BD: 'BD',
  'Non-BD': 'Non-BD',
};

export const assetsProgressOptions = {
  campaignAssetsApprovedAll: 'All assets approved',
  campaignAssetsHasDeclined: 'Has declined assets',
  campaignAssetsHasPending: 'Has pending assets',
  campaignAssetsInitial: 'Assets not submitted',
};

export const primaryChannelOptions = {
  whatsAppSubscribed: {
    name: 'WhatsApp',
    subName: 'Subscribed',
  },
  whatsAppNotSubscribed: {
    name: 'WhatsApp',
    subName: 'Not subscribed',
  },
  emailSubscribed: {
    name: 'Email',
    subName: 'Subscribed',
  },
  emailNotSubscribed: {
    name: 'Email',
    subName: 'Not subscribed',
  },
};

export const postTypeFilters = {
  Text: 'Text',
  Photo: 'Photo',
  Video: 'Video',
  Album: 'Album',
};

export const editableTaskCells = {
  status: [
    groupTaskStatusOptions.TaskScheduled,
    groupTaskStatusOptions.TaskCompleted,
  ],
  cells: [
    'paymentRemarks',
    'paymentAmountPaid',
    'paymentDate',
    'paymentStatus',
  ],
};
