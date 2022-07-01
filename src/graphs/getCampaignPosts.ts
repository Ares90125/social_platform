import { gql } from "graphql-request";
import { requestApi } from "./request";

const statement =gql`
  query getCampaignPosts($campaignId: String!, $limit: Int, $nextToken: String) {
    getCampaignPosts(campaignId: $campaignId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        campaignId
        sourceId
        fbPermlink
        reactionCount
        commentCount
        createdAtUTC
        updatedAtUTC
        groupName
        postCreatedAtUTC
        postCreatedByName
        postRawText
        postPhotoUrl
        isAdminPost
        groupId
        isSystemGenerated
      }
      nextToken
    }
  }
`;

export type CampaignPostsType = {
  id: string,
  campaignId: string,
  sourceId: string,
  fbPermlink: string,
  reactionCount: string,
  commentCount: string,
  createdAtUTC: string,
  updatedAtUTC: string,
  groupName: string,
  postCreatedAtUTC: string,
  postCreatedByName: string,
  postRawText: string,
  postPhotoUrl: string,
  isAdminPost: string,
  groupId: string,
  isSystemGenerated: string,
}
export type CampaignPostsConnection = {
	items: Array<CampaignPost | null> | null;
	nextToken: string | null;
}

export type CampaignPost = {
	id: string;
	campaignId: string;
	sourceId: string;
	fbPermlink: string | null;
	reactionCount: number | null;
	commentCount: number | null;
	createdAtUTC: string;
	updatedAtUTC: string;
	groupName: string;
	postCreatedAtUTC: string;
	postCreatedByName: string;
	postRawText: string;
	postPhotoUrl: string;
}


export const getCampaignPosts = async (
  campaignId: string,
  limit: number,
  nextToken: string
): Promise<CampaignPostsConnection> => {
  const gqlAPIServiceArguments: any = {campaignId, limit};
  if (campaignId) {
    gqlAPIServiceArguments.campaignId = campaignId;
  }
  if (limit) {
    gqlAPIServiceArguments.limit = limit;
  }
  if (nextToken) {
    gqlAPIServiceArguments.nextToken = nextToken;
  }
  const { getCampaignPosts } = await requestApi<
    typeof gqlAPIServiceArguments,
    { getCampaignPosts: CampaignPostsConnection }
  >(statement, gqlAPIServiceArguments);

  return getCampaignPosts;
};
