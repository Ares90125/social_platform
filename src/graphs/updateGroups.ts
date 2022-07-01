import { gql } from 'graphql-request';
import { requestApi } from './request';

export type UpdateGroupInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  coverImageUrl?: string | null;
  coverImageOffsetX?: number | null;
  coverImageOffsetY?: number | null;
  iconUrl?: string | null;
  email?: string | null;
  groupType?: string | null;
  groupCategories?: string | null;
  groupSubCategories?: string | null;
  languages?: string | null;
  countries?: string | null;
  cities?: string | null;
  gender?: string | null;
  privacy?: string | null;
  targetType?: string | null;
  memberCount?: number | null;
  initiateInstallation?: boolean | null;
  initiateUninstallation?: boolean | null;
  groupCreatedAtUTC?: string | null;
  targetAudienceGender?: string | null;
  businessCategory?: string | null;
  country?: string | null;
  countryFromUTM?: string | null;
  recheckIfCSAppIsInstalledUsingUserId?: string | null;
  isDead?: boolean | null;
  facebookInsightsFileDetails?: FacebookInsightsDetails | null;
  noOfProfilePagesCreated?: number | null;
  defaultCommunityManager?: string | null;
};

export type Group = {
  __typename: 'Groups';
  id: string;
  createdAtUTC: string;
  updatedAtUTC: string;
  fbGroupId: string | null;
  name: string | null;
  description: string | null;
  coverImageUrl: string | null;
  coverImageOffsetX: number | null;
  coverImageOffsetY: number | null;
  iconUrl: string | null;
  email: string | null;
  groupType: string | null;
  groupCategories: string | null;
  groupSubCategories: string | null;
  languages: string | null;
  countries: string | null;
  cities: string | null;
  gender: string | null;
  privacy: string | null;
  memberCount: number | null;
  state: string | null;
  initiateInstallation: boolean | null;
  initiateUninstallation: boolean | null;
  groupCreatedAtUTC: string | null;
  businessCategory?: string | null;
  country?: string | null;
  countryFromUTM?: string | null;
  targetType: string | null;
  targetAudienceGender: string | null;
  metricsAvailableSinceUTC: string | null;
  metricsAvailableUntilUTC: string | null;
  dataAvailableSinceUTC: string | null;
  dataAvailableUntilUTC: string | null;
  role: string | null;
  areMetricsAvailable: boolean;
  groupTimezoneName?: string | null;
  groupTimezoneInfo?: string | null;
  isDead?: boolean | null;
  isOverviewDataAvailable?: boolean | null;
  receiveWANotifications?: boolean | null;
  receiveEmailNotifications?: boolean | null;
  percentageLast3DaysMetricsAvailable?: number | null;
  facebookInsightsFileDetails?: FacebookInsightsDetails | null;
  noOfProfilePagesCreated: string | null;
  isMonetized?: string | null;
  isAdminTokenAvailable?: string | null;
};
type FacebookInsightsDetails = {
  fileName: string;
  sheetUID: string;
  fileStatus: FacebookInsightsFileStatus;
  fileUploadedAtUTC: string;
};
export enum FacebookInsightsFileStatus {
  Valid = 'Valid',
  Expired = 'Expired',
  Invalid = 'Invalid',
  UploadPending = 'UploadPending',
  Processing = 'Processing',
}

const groupsQueryReturnAttributes = `__typename
          id
          createdAtUTC
          updatedAtUTC
          fbGroupId
          name
          description
          coverImageUrl
          coverImageOffsetX
          coverImageOffsetY
          iconUrl
          email
          groupType
          groupCategories
          groupSubCategories
          targetType
          languages
          countries
          cities
          gender
          targetAudienceGender
          privacy
          memberCount
          state
          initiateInstallation
          initiateUninstallation
          groupCreatedAtUTC
          role
          businessCategory
          country
          countryFromUTM
          metricsAvailableSinceUTC
          metricsAvailableUntilUTC
          dataAvailableSinceUTC
          dataAvailableUntilUTC
          areMetricsAvailable
          groupTimezoneName
          addedByUserId
          isDead
          isOverviewDataAvailable
          groupInstallationStartedAtUTC
          groupReInstallationStartedAtUTC
          receiveWANotifications
          receiveEmailNotifications
          percentageLast3DaysMetricsAvailable
          percentageLast28DaysMetricsAvailable
          groupTimezoneInfo
          groupTimezoneOffsetInMins
          isRecommendationJobTriggered
          receiveWANotifications
          historyJobsStartedAtUTC
          percentageLast7DaysMetricsAvailable
          percentageLastMonthMetricsAvailable
          percentagesSecondLastMonthMetricsAvailable
          percentagesThirdLastMonthMetricsAvailable
          percentageLast14DaysMetricsAvailable
          isConversationTrendAvailable
          areRecommendationsAvailable
          isHistoricalPullComplete
          doesQueueMessageExists
          doesHistoryQueueMessageExists
          isCSFbGroupAppInstalled
          lastMoreThan50PendingRequestNotificationSentAtUTC
          groupUnInstalledAtUTC
          groupInstallationCompletedAtUTC
          groupReInstallationCompletedAtUTC
          isAdminTokenAvailable
          memberEngagementRateUTC
          postEngagementRateUTC
          facebookInsightsFileDetails {
            __typename
            fileName
            sheetUID
            fileStatus
            fileUploadedAtUTC
          }
          noOfProfilePagesCreated
          isMonetized`;

const statement = gql`
  mutation updateGroups($input: [UpdateGroupInput!]!) {
    updateGroups(input: $input) {
      ${groupsQueryReturnAttributes}
  }
}`;

export const updateGroups = async (
  input: UpdateGroupInput,
): Promise<Group> => {
  const result = await requestApi<
    { input: UpdateGroupInput },
    Group
  >(statement, { input });

  return result;
};
