import { requestApi } from './request';
import { gql } from 'graphql-request';

export type GroupTotalMembers = {
	groupId: string | null;
    sectionTitle: string;
}

const statement = gql`mutation deleteCBRCustomConversation($groupId: String!, $sectionTitle: String!) {
    deleteCBRCustomConversation(groupId: $groupId, sectionTitle: $sectionTitle) {
          groupId
                sectionTitle
         }
     }`
export const deleteCBRCustomConversation = async(
    groupId: string,sectionTitle: string
):Promise<GroupTotalMembers>=>{
    const gqlAPIConversation: { groupId: string,sectionTitle: string } = { groupId,sectionTitle}
    const { deleteCBRCustomConversation } = await requestApi<
        typeof gqlAPIConversation,
        { deleteCBRCustomConversation: GroupTotalMembers }
    >(statement, gqlAPIConversation)
    return deleteCBRCustomConversation
}