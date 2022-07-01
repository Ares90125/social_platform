import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation RequireAssetReminder(
    $campaignId: String!
    $groupId: String!
    $message: String
  ) {
    requireAssetReminder(
      campaignId: $campaignId
      groupId: $groupId
      message: $message
    ) {
      status
    }
  }
`;

export type RequireAssetReminderArgs = {
  campaignId: string;
  groupId: string;
  message?: string;
};

export const requireAssetReminder = async (
  assetInfo: RequireAssetReminderArgs,
): Promise<{ status: string }> => {
  const result = await requestApi<
    RequireAssetReminderArgs,
    { requireAssetReminder: { status: string } }
  >(statement, assetInfo);

  return result.requireAssetReminder;
};
