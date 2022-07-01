import { requestApi } from './request';
import { gql } from 'graphql-request';

export type GroupOverview = {
    __typename: 'GroupViewState';
    groupId: string;
    totalMembers: number;
    totalConversations: any;
    totalEngagement: number;
    engagementPercentage: number;
    monthlyActiveUsersPercentage: number;
    dailyActiveUsersPercentage: number;
    memberToAdminPostRatio: number;
    DAUMAURatio: any;
    dailyViewsAverage: any;
    monthlyViewsAverage: any;
    totalViews: any;
}

const statement = gql`query getGroupOverviewStats($groupId: String!, $startDate: String!, $endDate: String!) {
    getGroupOverviewStats(groupId: $groupId, startDate: $startDate, endDate: $endDate) {
      __typename
     groupId
totalMembers
totalConversations
totalEngagement
engagementPercentage
monthlyActiveUsersPercentage
dailyActiveUsersPercentage
memberToAdminPostRatio
DAUMAURatio
  dailyViewsAverage
monthlyViewsAverage
totalViews
    }
  }`

  export const getGroupOverviewStats = async(
    groupId: string,startDate:string,endDate:string
  ):Promise<any>=>{
    const gqlAPIConversation:{groupId: string,startDate:string,endDate:string} = { groupId,startDate,endDate }
    const { getGroupOverviewStats } = await requestApi<
    typeof gqlAPIConversation,
    { getGroupOverviewStats :any}
    >(statement,gqlAPIConversation)
    return getGroupOverviewStats;
  }