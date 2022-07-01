import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation MarkCmcNotificationAsRead($id: String!) {
    markCmcNotificationAsRead(id: $id) {
      status
    }
  }
`;

export const markCMCNotificationAsRead = async (
  id: string,
): Promise<{ status: string }> => {
  const gqlAPIServiceArguments: { id: string } = { id };

  const result = await requestApi<
    { id: string },
    { markCmcNotificationAsRead: { status: string } }
  >(statement, gqlAPIServiceArguments);

  return result.markCmcNotificationAsRead;
};
