import { requestApi } from './request';
import { gql } from 'graphql-request';

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
export type createCBRCustomConversation ={
    items:items[]
  }

const statement = gql`mutation createCBRCustomConversation($groupId: String!, $sectionTitle: String!, $sectionSubtitle: String!, $buckets: [CreateBucketInput]!) {
    createCBRCustomConversation(input: {groupId: $groupId, sectionTitle: $sectionTitle, sectionSubtitle: $sectionSubtitle, buckets: $buckets}) {
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

export const createCBRCustomConversation = async(
    groupId:string, sectionTitle:string, sectionSubtitle:string, buckets: any
):Promise<createCBRCustomConversation[]>=>{
    const gqlAPIConversation:{groupId:string, sectionTitle:string, sectionSubtitle:string, buckets: any} = {groupId, sectionTitle, sectionSubtitle, buckets}
    const { createCBRCustomConversation } = await requestApi<
        typeof gqlAPIConversation,
        { createCBRCustomConversation:createCBRCustomConversation[] }
    >(statement,gqlAPIConversation);
    return createCBRCustomConversation;
}