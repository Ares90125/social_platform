import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  query getCommunityAdmins($groupId: String!) {
    getCommunityAdmins(groupId: $groupId) {
      id
      fullname
      cmcTrained
      modeOfCommunication
      modeOfCommunicationVerificationStatus
      mobileNumber
      email
      mobileCountryCode
      mobileDialCode
      performanceTrained
    }
  }
`;

export type GetCommunityAdminsInput = {
  groupId: string;
};

export type CommunityAdmin = {
  cmcTrained: boolean;
  email: string;
  fullname: string;
  id: string;
  mobileCountryCode: string;
  mobileDialCode: string;
  mobileNumber: string;
  modeOfCommunication: string;
  modeOfCommunicationVerificationStatus: string;
  performanceTrained: boolean;
};

export const getCommunityAdmins = async (
  input: GetCommunityAdminsInput,
): Promise<CommunityAdmin[]> => {
  const result = await requestApi<
    GetCommunityAdminsInput,
    { getCommunityAdmins: CommunityAdmin[] }
  >(statement, input);

  return result.getCommunityAdmins;
};
