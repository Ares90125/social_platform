import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from '@mui/x-data-grid';
import { Community } from '../../../../graphs/communityDiscoveryAPI';
import { Metric } from '../../../ui';
import {
  createCMCampaignGroups,
  CreateCMCCampaignGroupsInput,
} from '../../../../graphs/createCMCampaignGroups';
import { CampaignInputs } from '../../../screens/campaign/components/detailsTab/campaign.types';
import { shortNumber } from '../../../../utils/helpers/short-number';
import { NormalizedCommunity } from '../../../../graphs/listCampaignGroupsAndTasksDetails';
import { SelectedCommunitiesModal } from './SelectedCommunitiesModal';
import { Spinner } from '../../../form';
import { createCampaignSimple } from '../../../../graphs/createCMCcampaign';
import { defaultValues } from '../../../screens/campaign/components/detailsTab/defaultFormValues';
import { getAllBrands } from '../../../../graphs/brands';
import { BrandSchema } from '../../../../api/Brand/BrandSchema';
import { CampaignStatusEnum } from '../../../../utils/enums/campaignStatus';
import { useToast } from '../../../../context/toast';

const columns: GridColDef[] = [
  {
    headerName: '',
    field: 'linkToFb',
    width: 20,
    sortable: false,
    renderCell: (params: GridRenderCellParams<string>): React.ReactElement =>
      params.value ? (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          <Image
            src="/icons/icon-outbond.svg"
            alt="fb group"
            width={16}
            height={16}
          />
        </a>
      ) : (
        <span />
      ),
  },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'memberCount', headerName: 'Members', width: 150 },
  {
    field: 'campaignPostEngagementRateLastNinetyDays',
    headerName: 'Campaign Engagement',
    width: 150,
  },
  {
    field: 'postsEngagementRateLastNinetyDays',
    headerName: 'Post Engagement',
    width: 150,
  },
  {
    field: 'averageActiveMember',
    headerName: 'Daily Active members',
    width: 150,
  },
  { field: 'averageTopPostsReach', headerName: 'Top Posts Reach', width: 150 },
  { field: 'categoryDensity', headerName: 'Category Density ', width: 150 },
  { field: 'state', headerName: 'Group State', width: 150 },
  { field: 'country', headerName: 'Location', width: 150 },
  { field: 'topTenCities', headerName: 'Top 10 cities', width: 150 },
  {
    field: 'groupInstallationStartedAtUTC',
    headerName: 'Installed Date',
    width: 150,
  },
  { field: 'businessCategory', headerName: 'Business Category', width: 150 },
  { field: 'CmcTrained', headerName: 'CMC Trained', width: 150 },
  {
    field: 'performanceTrained',
    headerName: 'Performance Trained',
    width: 150,
  },
  { field: 'groupProfile', headerName: 'Group Profile', width: 150 },
  { field: 'CmcRatingTotal', headerName: 'CMC Rating Total', width: 150 },
  { field: 'CmcRatingCount', headerName: 'CMC Rating Count', width: 150 },
  { field: 'CmcRatingAvg', headerName: 'CMC Rating Avg', width: 150 },
];

type DataListProps = {
  communities: Community[];
  isLoading?: boolean;
  selectedCommunityIds: string[];
  normalizedCommunities: NormalizedCommunity[];
  campaign?: CampaignInputs;
  monetizableGroupsHavingCampaignTaskToPerformThisMonth: number;
  nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth: number;
  totalMonetizableGroups: number;
  handleCloseModal: () => void;
};

export const DataList: React.FC<DataListProps> = ({
  communities,
  isLoading,
  selectedCommunityIds,
  normalizedCommunities,
  campaign,
  monetizableGroupsHavingCampaignTaskToPerformThisMonth,
  nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth,
  totalMonetizableGroups,
  handleCloseModal,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setSuccessToast, setErrorToast } = useToast();
  const allBrandsCached = queryClient.getQueryData<BrandSchema[]>('brands');
  useQuery('brands', getAllBrands, {
    enabled: !allBrandsCached?.length,
  });
  const activeBrand = allBrandsCached?.filter(
    (brand) => brand && brand.id === router.query.id,
  )[0];
  const [selectedCommunities, setSelectedCommunities] = useState<Community[]>(
    [],
  );
  const [selectedApiCommunities, setSelectedApiCommunities] = useState<
    NormalizedCommunity[]
  >([...normalizedCommunities]);
  const [allSelectedCommunities, setAllSelectedCommunities] = useState<
    Array<NormalizedCommunity | Community>
  >([...normalizedCommunities]);
  const [isSelectedModalOpened, setIsSelectedModalOpened] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [selectionModel, setSelectionModel] = useState<Set<GridRowId>>(
    new Set(),
  );

  const createCampaignMutation = useMutation(createCampaignSimple);

  const campaignsMutation = useMutation(createCMCampaignGroups, {
    onMutate: () => {
      setButtonIsDisabled(true);
    },
    onSuccess: () => {
      setButtonIsDisabled(false);
      if (typeof router?.query?.name === 'string') {
        return;
      }

      queryClient.invalidateQueries(
        `brands-${campaign?.brandId}-${campaign?.campaignId}`,
      );
      setSuccessToast();
      handleCloseModal();
    },
    onError: () => {
      setErrorToast();
    },
  });
  const normalizedShowingCommunities: Community[] = communities.map((c) => ({
    ...c,
    averageActiveMember: c.averageActiveMember || '-',
    averageTopPostsReach: c.averageTopPostsReach
      ? `${c.averageTopPostsReach}%`
      : '0.00%',
    categoryDensity: c.categoryDensity ? `${c.categoryDensity}%` : '0%',
    topTenCities: c.topTenCities || '',
    groupInstallationStartedAtUTC: moment(
      c.groupInstallationStartedAtUTC,
    ).format('d MMM yyyy'),
    CmcTrained: c.CmcTrained || '',
    performanceTrained: c.performanceTrained || '',
    groupProfile: c.groupProfile || '',
    CmcRatingTotal: c.CmcRatingTotal || '',
    CmcRatingCount: c.CmcRatingCount || '',
    CmcRatingAvg: c.CmcRatingAvg || '',
    linkToFb: c.fbGroupId
      ? `https://www.facebook.com/groups/${c.fbGroupId}`
      : '',
  }));

  const handleSelectedModalOpen = (): void => setIsSelectedModalOpened(true);
  const handleSelectedModalClose = (): void => setIsSelectedModalOpened(false);

  const handleAddCommunities = (
    newCommunities: CreateCMCCampaignGroupsInput[],
  ): void => {
    const communityChunks = _.chunk(newCommunities, 25);

    Promise.all(
      communityChunks.map((chunk) => campaignsMutation.mutateAsync(chunk)),
    );
  };

  const addCampaigns = (): void => {
    const neededCampaigns = allSelectedCommunities
      .filter(({ groupId }) => {
        if (!groupId) return;

        return (
          selectionModel.has(groupId) && !selectedCommunityIds.includes(groupId)
        );
      })
      .map((community) => {
        const communityInfo: CreateCMCCampaignGroupsInput =
          {} as CreateCMCCampaignGroupsInput;

        communityInfo.campaignId = router.query.campaignId as string;
        communityInfo.groupId = community.groupId;
        communityInfo.fbGroupId = community.fbGroupId;
        communityInfo.memberCount = community.memberCount;
        communityInfo.campaignPostEngagementRateLastNinetyDays =
          +community.campaignPostEngagementRateLastNinetyDays!;
        communityInfo.postsEngagementRateLastNinetyDays =
          +community.postsEngagementRateLastNinetyDays!;
        communityInfo.groupName = (community as Community).name;
        communityInfo.state = community.state;
        communityInfo.groupInstallationStartedAtUTC =
          community.groupInstallationStartedAtUTC;
        communityInfo.businessCategory = community.businessCategory;
        communityInfo.topTenCities = community.topTenCities;
        communityInfo.categoryDensity = parseFloat(
          community.categoryDensity as string,
        ).toString();
        communityInfo.location = community.country;
        communityInfo.communityAdminId = (
          community as Community
        ).defaultCommunityAdmin;
        communityInfo.averageTopPostsReach = parseFloat(
          community.averageTopPostsReach as string,
        ).toString();

        return communityInfo;
      });

    if (neededCampaigns.length > 0) {
      if (typeof router?.query?.name === 'string' && activeBrand) {
        createCampaignMutation
          .mutateAsync({
            brandId: activeBrand.id,
            brandName: activeBrand.name,
            campaignName: router.query.name,
            engagementInsights: defaultValues.engagementInsights,
            status: CampaignStatusEnum.Draft,
            cmcReportVersion: 2,
          })
          .then((createdCampaign) => {
            const communityForNewCampaign = neededCampaigns.map((c) => ({
              ...c,
              campaignId: createdCampaign.campaignId,
            }));

            handleAddCommunities(communityForNewCampaign);
            return createdCampaign;
          })
          .then((createdCampaign) => {
            router.push(
              `/brands/${router.query.id}/edit-campaign/${createdCampaign.campaignId}`,
            );
          });
        return;
      }

      handleAddCommunities(neededCampaigns);
    }
  };

  const getFillRate = (): string => {
    let num =
      monetizableGroupsHavingCampaignTaskToPerformThisMonth +
      nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth;
    let den =
      totalMonetizableGroups +
      monetizableGroupsHavingCampaignTaskToPerformThisMonth;

    allSelectedCommunities?.forEach((community) => {
      if (!community.isAnyCampaignTaskToBePerformedThisMonth) {
        num += 1;
        if (!community.isMonetizable) {
          den += 1;
        }
      }
    });

    return `${(num / den).toFixed(2)}%`;
  };

  const totalMembersInSelectedCommunities = (): string => {
    let memberCount = 0;
    allSelectedCommunities.forEach((community) => {
      memberCount += community?.memberCount || 0;
    });

    return `${shortNumber(memberCount)}`;
  };

  const handleRemoveSelection = (groupId: string): void => {
    setSelectionModel((prev) => {
      const newSet = new Set(prev);
      newSet.delete(groupId);
      return newSet;
    });
  };

  const handleSelection = (newSelectionModel: Set<GridRowId>): void => {
    const apiSelectionIds: string[] = [];
    const newSelectionIds: string[] = [];

    newSelectionModel.forEach((id) => {
      const groupId = id as string;

      if (!selectedCommunityIds.includes(groupId)) {
        newSelectionIds.push(groupId);
        return;
      }

      apiSelectionIds.push(groupId);
    });
    // TODO: fix any types
    const filterCommunity = (prev: any[], newIds: string[]): any[] =>
      prev.length
        ? [
            ...prev.filter(
              (c) =>
                !normalizedShowingCommunities.find(
                  // pass all that not in current tab
                  (nsc) => nsc.groupId && nsc.groupId === c.groupId,
                ) && newIds.includes(c.groupId),
            ),
            // current tab
            ...normalizedShowingCommunities.filter(
              (c) => c.groupId && newIds.includes(c.groupId),
            ),
          ]
        : normalizedShowingCommunities.filter(
            (c) => c.groupId && newIds.includes(c.groupId),
          );

    if (!newSelectionIds.length) {
      setSelectedCommunities([]);
    } else {
      setSelectedCommunities((prev) => filterCommunity(prev, newSelectionIds));
    }
    if (!apiSelectionIds.length) {
      setSelectedApiCommunities([]);
    } else {
      setSelectedApiCommunities((prev) =>
        filterCommunity(prev, apiSelectionIds),
      );
    }
  };

  useEffect(() => {
    setSelectionModel((prev) => {
      selectedCommunityIds.forEach((c) => {
        prev.add(c);
      });
      return prev;
    });
  }, []);

  useEffect(() => {
    handleSelection(selectionModel);
  }, [selectionModel.size]);

  useEffect(() => {
    setAllSelectedCommunities([
      ...selectedApiCommunities,
      ...selectedCommunities,
    ]);
  }, [selectedApiCommunities, selectedCommunities]);

  return !isLoading ? (
    <>
      <Box sx={{ height: 'calc(100vh - 400px)' }}>
        <DataGrid
          rows={normalizedShowingCommunities}
          columns={columns}
          rowHeight={38}
          hideFooter
          checkboxSelection
          disableSelectionOnClick
          loading={isLoading}
          onSelectionModelChange={(newSelectionModel): void => {
            setSelectionModel((prev) => {
              const newSet = new Set(Array.from(prev));

              newSet.forEach((p) => {
                if (
                  !newSelectionModel.includes(p) &&
                  normalizedShowingCommunities.find(
                    (c) => c.groupId && c.groupId === p,
                  )
                ) {
                  newSet.delete(p);
                }
              });
              newSelectionModel.forEach((m) => {
                newSet.add(m);
              });
              return newSet;
            });
          }}
          selectionModel={Array.from(selectionModel).filter(
            (m) =>
              !!normalizedShowingCommunities.find(
                (c) => c.groupId && c.groupId === m,
              ),
          )}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Metric label="Selected">
            {allSelectedCommunities.length} communities(
            <Button variant="text" onClick={handleSelectedModalOpen}>
              View List
            </Button>
            )
          </Metric>
          <Metric label="Total Members">
            {totalMembersInSelectedCommunities()}
          </Metric>
          <Metric label="Fill Rate">{getFillRate()}</Metric>
        </Box>
        <Button
          variant="contained"
          onClick={addCampaigns}
          disabled={buttonIsDisabled}
        >
          Add to Campaign
        </Button>
      </Box>
      <SelectedCommunitiesModal
        selectedApiCommunities={selectedApiCommunities}
        apiCommunities={normalizedCommunities}
        normalizedCommunities={allSelectedCommunities}
        handleClose={handleSelectedModalClose}
        isOpen={isSelectedModalOpened}
        campaignId={campaign?.campaignId}
        brandId={campaign?.brandId}
        handleRemoveSelection={handleRemoveSelection}
      />
    </>
  ) : (
    <Spinner spinnerWrapperProps={{ style: { margin: '25vh auto 0' } }} />
  );
};
