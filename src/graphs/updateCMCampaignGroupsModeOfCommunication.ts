import { gql } from 'graphql-request';
import { requestApi } from './request';

export type UpdateCampaignGroupModeOfCommunicationInput = {
  campaignId: string;
  groupId: string;
  communityAdminId: string;
  modeOfCommunication: string;
};
export type UpdateCampaignGroupModeOfCommunicationResponse = {
  campaignId: string;
  communityAdminContact: string | null
  groupId: string
  modeOfCommunicationVerificationStatus: string
};

const statement = gql`
  mutation updateCMCampaignGroupsModeOfCommunication($input: [UpdateCampaignGroupModeOfCommunicationInput]!) {
      updateCMCampaignGroupsModeOfCommunication(input: $input) {
      campaignId
        groupId
        modeOfCommunicationVerificationStatus
        communityAdminContact
      }
    }`;

export const updateCMCampaignGroupsModeOfCommunication = async (
  input: UpdateCampaignGroupModeOfCommunicationInput[],
): Promise<UpdateCampaignGroupModeOfCommunicationResponse[]> => {
  const result = await requestApi<
    { input: UpdateCampaignGroupModeOfCommunicationInput[] },
    { updateCMCampaignGroupsModeOfCommunication: UpdateCampaignGroupModeOfCommunicationResponse[] }
  >(statement, { input });

  return result.updateCMCampaignGroupsModeOfCommunication;
};
/*
  async updateCMCampaignGroupsModeOfCommunication
  (input: [UpdateCampaignGroupModeOfCommunicationInput]):
   Promise<any> {

    const gqlAPIServiceArguments: any = {input};
    const response = await this.executeGraphQlStatement(statement, gqlAPIServiceArguments);
    return <any>response.data.updateCMCampaignGroupsModeOfCommunication;
  }
*/
