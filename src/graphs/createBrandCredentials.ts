import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation createBrandCredentials(
    $brandName: String!
    $iconUrl: String!
    $communicationEmailForCredentials: String!
  ) {
    createBrandCredentials(
      brandName: $brandName
      iconUrl: $iconUrl
      communicationEmailForCredentials: $communicationEmailForCredentials
    ) {
      message
      brandId
    }
  }
`;

export type CreateBrandInputs = {
  brandName: string;
  communicationEmailForCredentials: string;
  iconUrl: string;
  doNotProcessError?: boolean;
};

type CreateBrandCredentials = {
  brandId: string;
  message: string;
};

export const createBrandCredentials = async (
  input: CreateBrandInputs,
): Promise<CreateBrandCredentials> => {
  const result = await requestApi<
    CreateBrandInputs,
    { createBrandCredentials: CreateBrandCredentials }
  >(statement, input);

  return result.createBrandCredentials;
};
