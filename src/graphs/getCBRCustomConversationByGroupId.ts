import { requestApi } from './request';
import { gql } from 'graphql-request';

export type buckets = {
    name: string;
    mentions: string;
    keywords: string;
    visibility: string;
}

export type items = {
    groupId: string;
    sectionTitle: string;
    sectionSubtitle: string;
    createdAtUTC: string | null;
    updatedAtUTC: string | null;
    buckets: buckets[]
}
export type getCBRCustomConversation ={
  items:items[]
}

const statement = gql`query getCBRCustomConversation($groupId: String!) {
  getCBRCustomConversationByGroupId( groupId: $groupId) {
      items {
        groupId
        sectionTitle
        sectionSubtitle
        createdAtUTC
        updatedAtUTC
        buckets {
          name
          mentions
          keywords
          visibility
        }
      }
    }
  }`;

export const getCBRCustomConversationByGroupId = async (
    groupId: string,
): Promise<getCBRCustomConversation> => {
    const gqlAPIConversation: { groupId: string } = { groupId }
    const { getCBRCustomConversationByGroupId } = await requestApi <
        typeof gqlAPIConversation,
        { getCBRCustomConversationByGroupId: getCBRCustomConversation}
      > ( statement, gqlAPIConversation );
    return getCBRCustomConversationByGroupId;
}