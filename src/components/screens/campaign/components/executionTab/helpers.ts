import { useMutation, QueryClient } from 'react-query';
import moment from 'moment';
import Moment from 'moment-timezone';
import { GridRowId } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/models/api/gridApiCommunity';
import {
  CampaignGroupAndTaskDetails,
  MetaColumns,
  NormalizedCommunity,
} from '../../../../../graphs/listCampaignGroupsAndTasksDetails';
import {
  UpdateCampaignGroupInput,
  updateCMCampaignGroups,
} from '../../../../../graphs/updateCMCampaignGroups';
import { shortNumber } from '../../../../../utils/helpers/short-number';
import {
  assetsStatusOptions,
  currencies,
  groupTaskStatusOptions,
  paymentStatusOptions,
} from './cellsOptions';
import { CommunityManager } from '../../../../../graphs/getCommunityManagers';
import { CampaignInputs } from '../detailsTab/campaign.types';
import { CampaignCommunityStatus } from '../../../../../utils/enums/campaignCommunityStatus';
import { CampaignStatusEnum } from '../../../../../utils/enums/campaignStatus';

export const useMutationCell = (
  queryClient: QueryClient,
  brandId: string,
  campaignId: string,
): any =>
  useMutation(
    (data: UpdateCampaignGroupInput) => updateCMCampaignGroups([data]),
    {
      onSuccess: (): void => {
        queryClient.invalidateQueries(`brands-${brandId}-${campaignId}`);
      },
      onError: () => {},
    },
  );

export const closeEditCell = (
  apiRef: React.MutableRefObject<GridApiCommunity>,
  id: GridRowId,
  field: string,
): void => {
  if (apiRef.current.getCellMode(id, field) === 'edit') {
    apiRef.current.stopCellEditMode({ id, field });
  }
};

export const getnormalizedCommunities = (
  campaign: CampaignInputs | undefined,
  communities: CampaignGroupAndTaskDetails[] | undefined,
  communityManagers: CommunityManager[] | undefined,
): NormalizedCommunity[] | undefined =>
  communities?.map((community) => {
    const {
      assetsKpis,
      averageTopPostsReach,
      cohort,
      communityAdminName,
      communityManagerId,
      fbGroupId,
      groupId,
      memberCount,
      campaignPostEngagementRateLastNinetyDays,
      postsEngagementRateLastNinetyDays,
      state,
      groupTaskStatus,
      defaultTaskDate,
      groupInstallationStartedAtUTC,
      businessCategory,
      currency,
      timezone,
      paymentStatus,
      paymentAmountPaid,
      paymentRemarks,
      paymentDate,
      pricing,
      categoryDensity,
      topTenCities,
      metadata,
    } = community;
    const {
      country,
      region,
      isMonetizable,
      isMonetized,
      isAnyCampaignTaskToBePerformedThisMonth,
      averageActiveMember,
    }: MetaColumns = metadata ? JSON.parse(metadata) : {};

    const convertedMemberCount = memberCount ? shortNumber(memberCount) : '0';
    const convertedDefaultTaskDate = moment(defaultTaskDate).isValid()
      ? moment(defaultTaskDate).format('DD MMM yyyy hh:mm A')
      : campaign?.defaultTaskDate;
    let activeCurrency = '₹';

    if (currency && currencies[currency]) {
      activeCurrency = currencies[currency];
    } else if (campaign?.currency && currencies?.[campaign.currency]) {
      activeCurrency = currencies?.[campaign.currency];
    }

    return {
      ...community,
      ...assetsKpis,
      startDateAtUTC: campaign?.startDateAtUTC,
      endDateAtUTC: campaign?.endDateAtUTC,
      defaultTaskDate: moment(convertedDefaultTaskDate).isValid()
        ? moment(convertedDefaultTaskDate).format('DD MMM yyyy hh:mm A')
        : 'yet to be scheduled',
      id: groupId,
      convertedMemberCount,
      memberCount,
      cohort: cohort || 'Pick a value',
      communityAdminName: communityAdminName || 'pick a value',
      communityManager:
        communityManagers?.find((cm) => cm.id === communityManagerId)
          ?.fullname || 'pick a value',
      currency: activeCurrency,
      pricing: pricing || '',
      groupTaskStatus: groupTaskStatus
        ? groupTaskStatusOptions[groupTaskStatus]
        : 'Empty',
      timezone:
        timezone ||
        campaign?.timezoneName ||
        `(UTC ${Moment.tz(Moment.tz.guess()).format(
          'Z',
        )}) ${Moment.tz.guess()}`,
      paymentStatus: paymentStatusOptions[paymentStatus] || 'Not paid',
      paymentRemarks: paymentRemarks || '',
      paymentAmountPaid: paymentAmountPaid || 'add amount',
      paymentDate: moment(paymentDate).isValid()
        ? moment(paymentDate).format('DD MMM yyyy hh:mm A')
        : 'yet to be scheduled',
      campaignPostEngagementRateLastNinetyDays:
        campaignPostEngagementRateLastNinetyDays || '-',
      postsEngagementRateLastNinetyDays:
        postsEngagementRateLastNinetyDays || '-',
      state: state || '-',
      groupInstallationStartedAtUTC: moment(
        groupInstallationStartedAtUTC,
      ).format('DD MMM yyyy'),
      businessCategory: businessCategory || '-',
      categoryDensity: categoryDensity || '-',
      country: country || '-',
      region: region || '-',
      isMonetized: isMonetized || '-',
      isMonetizable: isMonetizable || '-',
      topTenCities: topTenCities || '-',
      isAnyCampaignTaskToBePerformedThisMonth:
        isAnyCampaignTaskToBePerformedThisMonth || '-',
      averageActiveMember: averageActiveMember || '-',
      averageTopPostsReach: averageTopPostsReach || '-',
      linkToFb: fbGroupId ? `https://www.facebook.com/groups/${fbGroupId}` : '',
      campaignAssetsHasPending: assetsKpis.campaignAssetsHasPending
        ? 'Yes'
        : 'No',
      campaignAssetsHasDeclined: assetsKpis.campaignAssetsHasDeclined
        ? 'Yes'
        : 'No',
      campaignAssetsApprovedAll: assetsKpis.campaignAssetsApprovedAll
        ? 'Yes'
        : 'No',
      campaignAssetsInitial: assetsKpis.campaignAssetsInitial ? 'Yes' : 'No',
      campaignAssetsStatus:
        assetsStatusOptions[assetsKpis.campaignAssetsStatus] || '',
    };
  });

export const checkForCampaignStatusSendProposal = (
  communities: any,
  campaign: CampaignInputs | undefined,
): boolean => {
  let isCampaignreadyForSendProposal = false;
  communities?.forEach((community) => {
    if (
      community.groupTaskStatus &&
      community.groupTaskStatus !== CampaignCommunityStatus.CampaignBriefSent &&
      community.groupTaskStatus !== CampaignCommunityStatus.CampaignAccepted &&
      community.groupTaskStatus !== CampaignCommunityStatus.CampaignDeclined &&
      community.groupTaskStatus !== CampaignCommunityStatus.ContentApproved &&
      campaign?.startDateAtUTC
    ) {
      isCampaignreadyForSendProposal = true;
    }
  });
  return !isCampaignreadyForSendProposal
    ? campaign?.status !== CampaignStatusEnum.Draft
    : isCampaignreadyForSendProposal;
};
