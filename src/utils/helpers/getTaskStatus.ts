import { CampaignCommunityStatus } from '../enums/campaignCommunityStatus';

export const getTaskStatus = (value: string): string => {
  switch (value) {
    case CampaignCommunityStatus.CampaignBriefSent:
      return 'Campaign brief sent';
    case CampaignCommunityStatus.CampaignAccepted:
      return 'Campaign accepted';
    case CampaignCommunityStatus.CampaignDeclined:
      return 'Campaign declined';
    case CampaignCommunityStatus.ContentApproved:
      return 'Content approved';
    case CampaignCommunityStatus.PaymentSent:
      return 'Payment sent';
    case CampaignCommunityStatus.TaskCompleted:
      return 'Task completed';
    case CampaignCommunityStatus.TaskCreated:
      return 'Task created';
    case CampaignCommunityStatus.TaskDeclined:
      return 'Task declined';
    case CampaignCommunityStatus.TaskFailed:
      return 'Task failed';
    case CampaignCommunityStatus.TaskPaused:
      return 'Task paused';
    case CampaignCommunityStatus.TaskRequestSent:
      return 'Task request sent';
    case CampaignCommunityStatus.TaskScheduled:
      return 'Task scheduled';
    default:
      return 'empty';
  }
};
