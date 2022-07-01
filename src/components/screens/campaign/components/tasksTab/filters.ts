export type FilterChecbox = {
  displayName: string;
  name: string | null;
  isSelected: boolean;
};

export const defaultTypeFilters: FilterChecbox[] = [
  { displayName: 'Video', name: 'Video', isSelected: true },
  { displayName: 'Image', name: 'Image', isSelected: true },
  { displayName: 'Text', name: 'Text', isSelected: true },
  { displayName: 'Live video', name: 'LiveVideo', isSelected: true },
  { displayName: 'Multiple videos', name: 'MultiVideo', isSelected: true },
  { displayName: 'Video + Images', name: 'VideoImage', isSelected: true },
];

export const defaultStatusFilters: FilterChecbox[] = [
  { displayName: 'Empty', name: null, isSelected: true },
  {
    displayName: 'Campaign Brief Sent',
    name: 'CampaignBriefSent',
    isSelected: true,
  },
  {
    displayName: 'Content Approved',
    name: 'ContentApproved',
    isSelected: true,
  },
  { displayName: 'Task Created', name: 'TaskCreated', isSelected: true },
  {
    displayName: 'Task Request Sent',
    name: 'TaskRequestSent',
    isSelected: true,
  },
  {
    displayName: 'Task Scheduled',
    name: 'TaskScheduled',
    isSelected: true,
  },
  { displayName: 'Task Declined', name: 'TaskDeclined', isSelected: true },
  {
    displayName: 'Task Completed',
    name: 'TaskCompleted',
    isSelected: true,
  },
  { displayName: 'Task Paused', name: 'TaskPaused', isSelected: true },
  { displayName: 'Task Failed', name: 'TaskFailed', isSelected: true },
];
