import { gql } from 'graphql-request';
import { requestApi } from './request';

type CampaignUpload = {
  campaignId: string;
  fbPermLink: string | null;
  groupName: string;
  key: string;
  order: number;
  s3Key: string;
  sectionName: string;
  type: string;
};
export type ScreenshotType = {
  key: string;
  order?: number;
  id: string;
  type?: string;
  fbPermLink: string|null;
  s3Key: string;
  uploadedOn: string;
  sectionName: string;
  groupName: string;
  createdAtUTC: string;
  updatedAtUTC: string;
};
const statement = gql`
  mutation createScreenshotUploadData(
    $input: ScreenshotUploadDataInput!
  ) {
    createScreenshotUploadData(
      input: $input
    ) {
      key
      order
      id
      type
      fbPermLink
      s3Key
      uploadedOn
      sectionName
      groupName
      createdAtUTC
      updatedAtUTC
    }
  }
`;

export type createScreenshotUploadDataArgs = {
  input: CampaignUpload;
};

export const createScreenshotUploadData = async (
  taskInfo: createScreenshotUploadDataArgs,
): Promise<ScreenshotType> => {
  const result = await requestApi<
  createScreenshotUploadDataArgs,
    { createTaskForCampaignGroupAsset:ScreenshotType }
  >(statement, taskInfo);

  return result.createTaskForCampaignGroupAsset;
};
