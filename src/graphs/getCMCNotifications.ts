import request, { gql } from 'graphql-request';
import { getCookieByName } from '../utils/helpers/cookies';
import { getUser } from './user';

export type CMCNotificationInput = {
  userId?: string;
  timestamp?: number;
  count?: number;
  campaignId?: string;
  type: 'asset' | 'support';
};

export type CMCNotification = {
  assetItemId: string;
  brandId: string;
  campaignId: string;
  groupId: string;
  id: string;
  message: string;
  read: boolean;
  senderUserId: string;
  timestamp: number;
  userId: string;
};

const statement = gql`
  query FetchCMCNotifications(
    $userId: String!
    $timestamp: Long!
    $count: Int!
    $campaignId: String
    $type: CMCNotificationType
  ) {
    fetchCMCNotifications(
      userId: $userId
      timestamp: $timestamp
      count: $count
      campaignId: $campaignId
      type: $type
    ) {
      assetItemId
      brandId
      campaignId
      groupId
      id
      message
      read
      senderUserId
      timestamp
      userId
    }
  }
`;

export const getCMCNotifications = async ({
  count = 10,
  campaignId,
  type,
}: CMCNotificationInput): Promise<CMCNotification[]> => {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 1);
  const timestamp = dateNow.getMilliseconds();
  const token = getCookieByName('token') as string;
  const user = await getUser(token);

  const gqlAPIServiceArguments: CMCNotificationInput & { timestamp: number } = {
    timestamp,
    count,
    campaignId,
    type,
    userId: user.id,
  };

  const result = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: statement,
    variables: gqlAPIServiceArguments,
    requestHeaders: {
      authorization: token,
    },
  });

  if (!result?.fetchCMCNotifications?.length) {
    const resultCSAdmin = await request({
      url: 'https://graph.develop.convosight.com/graphql',
      document: statement,
      variables: { ...gqlAPIServiceArguments, userId: 'csadmin' },
      requestHeaders: {
        authorization: token,
      },
    });

    return <CMCNotification[]>resultCSAdmin.fetchCMCNotifications;
  }

  return <CMCNotification[]>result.fetchCMCNotifications;
};
