import { gql } from 'graphql-request';
import { requestApi } from './request';

const attributes = `
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
`;

const statement = gql`
  query getScreenshotUploadData($key: String!, $limit: Int, $nextToken: String) {
    getScreenshotUploadData(key: $key, limit: $limit, nextToken: $nextToken) {
      items {
        ${attributes}
      }
      nextToken
    }
  }
`;

export type ScreenshotType = {
  key: string;
  order?: number;
  id: string;
  type?: string;
  fbPermLink: string;
  s3Key: string;
  uploadedOn: string;
  sectionName: string;
  groupName: string;
  createdAtUTC: string;
  updatedAtUTC: string;
};

export type ScreenshotConnection = {
	items: Array<ScreenshotType | null> | null;
	nextToken: string | null;
}

export const getScreenshotUploadData = async (
  key: string,
  limit: number,
  nextToken?: string
): Promise<ScreenshotConnection> => {
  const gqlAPIServiceArguments: { key: string, limit: number, nextToken?: string } = { key, limit, nextToken };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { getScreenshotUploadData: ScreenshotConnection }
  >(statement, gqlAPIServiceArguments);

  return result.getScreenshotUploadData;
};
