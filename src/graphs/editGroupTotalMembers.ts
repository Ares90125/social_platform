import { requestApi } from './request';
import { gql } from 'graphql-request';

export type GroupTotalMembers = {
    groupId: string | null;
    dataDateUTC: string | null;
    metricForDayUTCStartTick: number | null;
    memberCount: number | null;
}
const statement = gql`mutation editGroupTotalMembers($input: [GroupTotalMembers!]!) {
    editGroupTotalMembers(input: $input) {
    dataDateUTC
groupId
memberCount
metricForDayUTCStartTick
    }
  }`
export const editGroupTotalMembers = async (
    input: GroupTotalMembers
): Promise<any> => {
    const gqlAPIConversation: { input: GroupTotalMembers } = { input }
    const { editGroupTotalMembers } = await requestApi<
        typeof gqlAPIConversation,
        { editGroupTotalMembers: any }
    >(statement, gqlAPIConversation)
    return editGroupTotalMembers
}