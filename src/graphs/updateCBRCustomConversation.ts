import { gql } from 'graphql-request';
import { requestApi } from './request';

export type buckets = {
    name: string;
    mentions: string;
    keywords: string;
    visibility: string;
}
export type items={
    groupId: string;
    sectionTitle: string;
    sectionSubtitle: string;
    createdAtUTC: string | null;
    updatedAtUTC: string | null;
    buckets: buckets[]
}
export type updateCBRCustomConversation ={
    items:items[]
  }

const statement = gql`mutation updateCBRCustomConversation($groupId: String!, $sectionTitle: String!, $sectionSubtitle: String!, $buckets: [CreateBucketInput]!) {
    updateCBRCustomConversation(input: {groupId: $groupId, sectionTitle: $sectionTitle, sectionSubtitle: $sectionSubtitle, buckets: $buckets}) {
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
     }`

export const updateCBRCustomConversation = async(
    groupId:string, sectionTitle:string, sectionSubtitle:string, buckets: any
):Promise<updateCBRCustomConversation[]>=>{
    const gqlAPIConversation:{groupId:string, sectionTitle:string, sectionSubtitle:string, buckets: any} = {groupId, sectionTitle, sectionSubtitle, buckets}
    const { updateCBRCustomConversation } = await requestApi<
        typeof gqlAPIConversation,
        { updateCBRCustomConversation:updateCBRCustomConversation[] }
    >(statement,gqlAPIConversation);
    return updateCBRCustomConversation;
}