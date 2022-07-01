import { gql } from 'graphql-request';
import { requestApi } from './request';

export type TriggerNotificationsForWAorEmailUpdateInput = {
  channel: 'Email' | 'WhatsApp',
  communityManagerName: string,
  communityAdminId: string,
  email?: string,
  mobileCountryCode?: string,
  mobileDialCode?: string,
  mobileNumber?: string,
};
type TriggerNotificationsForWAorEmailUpdateResponse = {
  triggerNotificationsForWAorEmailUpdate: string
};

const statement = gql`
  mutation triggerNotificationsForWAorEmailUpdate($input: triggerNotificationsForWAorEmailUpdateInput!) {
    triggerNotificationsForWAorEmailUpdate(input: $input)
  }`;

export const triggerNotificationsForWAorEmailUpdate = async (
  input: TriggerNotificationsForWAorEmailUpdateInput,
): Promise<any> => {
  const result = await requestApi<
    { input: TriggerNotificationsForWAorEmailUpdateInput },
    { data: TriggerNotificationsForWAorEmailUpdateResponse }
  >(statement, { input });

  return result.data;
};
