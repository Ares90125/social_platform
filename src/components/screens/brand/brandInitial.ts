import { CampaignStatusExtended } from '../../../utils/enums/campaignStatus';
import { CampaignInputs } from '../campaign/components/detailsTab/campaign.types';

export type GroupedCampaignsType = {
  [keyof in CampaignStatusExtended]: {
    campaigns?: _.Dictionary<CampaignInputs[]>;
    length: number;
    tabName: string;
  };
};

export const groupedCampaignsInitial: GroupedCampaignsType = {
  [CampaignStatusExtended.All]: {
    campaigns: undefined,
    length: 0,
    tabName: 'All campaigns',
  },
  [CampaignStatusExtended.Active]: {
    campaigns: undefined,
    length: 0,
    tabName: 'Active',
  },
  [CampaignStatusExtended.Completed]: {
    campaigns: undefined,
    length: 0,
    tabName: 'Completed',
  },
  [CampaignStatusExtended.Draft]: {
    campaigns: undefined,
    length: 0,
    tabName: 'Draft',
  },
  [CampaignStatusExtended.PendingApproval]: {
    campaigns: undefined,
    length: 0,
    tabName: 'Pending Approval',
  },
  /* [CampaignStatusExtended.Completed]: {
    campaigns: undefined,
    length: 0,
    tabName: 'Completed',
  }, */
  [CampaignStatusExtended.Scheduled]: {
    campaigns: undefined,
    length: 0,
    tabName: 'Scheduled',
  },
};
