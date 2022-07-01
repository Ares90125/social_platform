import { gql } from 'graphql-request';
import { PostContentType } from '../utils/enums/postContentType';
import { TaskStatus } from '../utils/enums/taskStatus';
import { TaskType } from '../utils/enums/taskTypeEnum';
import { requestApi } from './request';

export type CreateCampaignTask = {
  campaignId: string;
  groupId: string;
  imageUrls: string[];
  isPlaceholder: boolean;
  period: string;
  postType: PostContentType;
  text: string;
  timezoneName: string;
  title: string;
  toBePerformedByUTC: string;
  type: TaskType;
  userId: string;
  userName: string;
  videoUrls: string[];
  groupName: string;
};

export type CampaignTask = {
  __typename: 'CampaignTask';
  campaignId: string;
  taskId: string;
  userId: string;
  userName: string;
  groupId: string;
  status: TaskStatus | null;
  groupName: string | null;
  title: string | null;
  toBePerformedByUTC: string;
  type: TaskType;
  postType: PostContentType | null;
  description: string | null;
  text: string | null;
  mediaAllowed: string | null;
  imageUrls: Array<string | null> | null;
  videoUrls: Array<string | null> | null;
  linkUrls: Array<string | null> | null;
  createdAtUTC: string;
  updatedAtUTC: string;
  period: string | null;
  reasonForFailure: string | null;
  fbPermlink: string | null;
  isPlaceholder: boolean | null;
  errorFromSource: string | null;
  timezoneName: string | null;
  communityManagerId: string | null;
  communityManagerName: string | null;
  pricing: number | null;
  currency: string | null;
  idDraft: boolean | null;
};

export type CreateCampaignTaskInput = {
  campaignTasks: Array<CreateCampaignTask>;
  brandId: string;
};

const statement = gql`
  mutation CreateCampaignTask(
    $brandId: String!
    $campaignTasks: [CreateCampaignTaskInput]!
  ) {
    createCampaignTask(brandId: $brandId, campaignTasks: $campaignTasks) {
      __typename
      campaignId
      taskId
      userId
      groupId
      status
      groupName
      title
      postType
      toBePerformedByUTC
      type
      text
      description
      mediaAllowed
      imageUrls
      videoUrls
      linkUrls
      createdAtUTC
      updatedAtUTC
      period
      reasonForFailure
      userName
      fbPermlink
      isPlaceholder
      errorFromSource
      timezoneName
      isDraft
    }
  }
`;

export const createCampaignTask = async (
  input: CreateCampaignTaskInput,
): Promise<CampaignTask[]> => {
  const response = await requestApi<
    CreateCampaignTaskInput,
    { createCampaignTask: CampaignTask[] }
  >(statement, input);

  return response.createCampaignTask;
};
