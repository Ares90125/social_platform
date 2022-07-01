import { gql } from 'graphql-request';
import { PostContentType } from '../utils/enums/postContentType';
import { TaskStatus } from '../utils/enums/taskStatus';
import { CampaignTask } from './createCampaignTask';
import { requestApi } from './request';

export type UpdateCampaignTaskInput = {
  taskId: string;
  campaignId: string;
  userId: string;
  groupId: string;
  groupName?: string | null;
  title?: string | null;
  toBePerformedByUTC?: string;
  postType?: PostContentType | null;
  description?: string | null;
  text?: string | null;
  status?: TaskStatus | null;
  mediaAllowed?: string | null;
  imageUrls?: Array<string | null> | null;
  videoUrls?: Array<string | null> | null;
  linkUrls?: Array<string | null> | null;
  period?: string | null;
  isPlaceholder: boolean | null;
  fbPermlink: string | null;
  timezoneName: string | null;
  userName: string | null;
};

const statement = gql`
  mutation UpdateCampaignTaskDetails($input: UpdateCampaignTaskInput!) {
    updateCampaignTaskDetails(input: $input) {
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

export const updateCampaignTaskDetails = async (
  input: UpdateCampaignTaskInput,
): Promise<CampaignTask> => {
  const response = await requestApi<
    { input: UpdateCampaignTaskInput },
    { updateCampaignTaskDetails: CampaignTask }
  >(statement, { input });

  return response.updateCampaignTaskDetails;
};
