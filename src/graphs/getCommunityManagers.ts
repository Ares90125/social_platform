import { gql } from 'graphql-request';
import { getCookieByName } from '../utils/helpers/cookies';
import { requestApi } from './request';
import { getUser } from './user';

export type CommunityManager = {
  id: string,
  fullname: string
};

const statement = gql`
  query getCommunityManagers {
    getCommunityManagers{
      id
      fullname
      }
}`;

export const getAllCommunityManagers = async (): Promise<CommunityManager[]> => {
  const token = getCookieByName('token') as string;
  const user = await getUser(token);

  const result = await requestApi<
    { userId: string },
    { getCommunityManagers: CommunityManager[] }
  >(statement, { userId: user.id });

  return result.getCommunityManagers;
};
