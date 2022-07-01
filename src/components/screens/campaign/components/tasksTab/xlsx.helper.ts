export const campaignTaskColumnNames = [
  'No.',
  'groupId',
  'groupName',
  'communityAdminName',
  'postType',
  'period',
  'title',
  'text',
  'toBePerformedByUTC',
  'videoUrls',
  'imageUrls',
  'fbPermlink',
  'memberCount',
  'groupTaskStatus',
  'adminName',
  'pricing',
  'communityAdminName',
  'email',
  'mobileNumber',
  'cohort',
  'communityManager',
  'Image Urls',
  'Video Urls',
  'FB Post Link',
] as const;

export type CampaignDetailsColumns = {
  [key in typeof campaignTaskColumnNames[number]]?: string | number | boolean;
};
